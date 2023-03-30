import React, { useEffect, useRef, useState } from "react";
import "../styles/single.scss";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../config";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";
import { Framework } from "@superfluid-finance/sdk-core";
import fluidPay_api from "../artifacts/fluidPay.json";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loading_infinite from "../assets/scan-loader.gif";
import Web3 from "web3";

function SinglePage() {
  // const location = useLocation();
  const navigate = useNavigate();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const dataFetchedRef = useRef(false);
  //   const platform_address = "0xcc920c851327AF767b4bf770e3b2C2ea50B90fde";
  const { id } = useParams();
  console.log(id);
  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: fluidPay_api,
    signerOrProvider: provider,
  });

  const [data, setData] = useState([]);

  // console.log(location.state);

  const startStream = async () => {
    console.log("starting the stream...");
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });
    console.log(sf);

    try {
      console.log(data[0].address);
      console.log(data[0].charges);
      const ethx = await sf.loadSuperToken("ETHx");
      console.log(ethx.address);
      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: data[0].charges,
        sender: address,
        receiver: data[0].address,
        superToken: ethx.address,
        // userData?: string
      });

      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(signer);
      const receipt = await result.wait();
      if (receipt) {
        navigate("/transaction", {
          state: {
            s_address: address,
            r_address: data[0].address,
            charges: data[0].charges,
            token: ethx.address,
          },
        });
      }
      console.log(result);

      console.log(`Congrats - you've just created a money stream!`);
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  };

  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      console.log("Ethereum successfully detected!");
    } else {
      console.log("Please install MetaMask!");
    }
  }
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    //function to fetch data
    const fetch = async () => {
      console.log("inside fetch");
      //   platformsAddresses_array =
      //     await connectedContract.getAllPlatformsAddress();
      //   console.log("platfroms addresses");
      //   console.log(platformsAddresses_array);

      let metadata_tx = await connectedContract.getPlatformData(id);

      console.log(metadata_tx);
      if (!data.length > 0)
        data.push({
          address: metadata_tx[0],
          name: metadata_tx[1],
          image: metadata_tx[2],
          description: metadata_tx[3],
          ph_address: metadata_tx[4],
          charges: parseInt(metadata_tx[5]),
        });
      setLoading(false);
      // setData(data);

      console.log(parseInt(metadata_tx[5]));
      console.log(data);

      //   console.log(metadata_tx);

      console.log("Platforms's metadata");
      //   console.log(metadata);
    };
    fetch();
    return () => {
      setData(data);
    };
  }, []);

  if (loading)
    return (
      <div className="loader">
        <img
          className="loading-screen-image"
          src={loading_infinite}
          alt="loading"
        ></img>
        {/* loading... */}
      </div>
    );
  return (
    <div className="single-orgs-page">
      <hr />
      <div className="orgs-name">
        <h1>{data[0].name}</h1>
      </div>
      <hr />
      <img className="orgs-image" src={data[0].image} alt="imageofthatorgs" />
      <hr />
      <div className="orgs-details">
        <h4>Address</h4>
        <p className="orgs-address">{data[0].ph_address}</p>
        <h4>Description</h4>
        <p className="orgs-desc">{data[0].description}</p>
        <h4>
          Charges -{" "}
          <span className="orgs-charges">
            {Web3.utils.fromWei(`${data[0].charges * 60}`, "ether")}
            {/* {data[0].charges * 60} */}
          </span>{" "}
          ETHx / hour
        </h4>
      </div>
      {/* <div className="orgs-qr-code">
        <img src="" alt="qr-code" />
      </div> */}
      <button className="paynow" onClick={() => startStream()}>
        Pay Now
      </button>
    </div>
  );
}

export default SinglePage;
