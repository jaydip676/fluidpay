import React, { useEffect, useRef, useState } from "react";
import "../styles/home.scss";
import orgs from "../DynamicComponentsData";
import { useNavigate } from "react-router-dom";
// import qr1 from "../assets/wap.png";
import { metadata } from "./Landing";
import fluidPay_api from "../artifacts/fluidPay.json";
import { CONTRACT_ADDRESS } from "../config";
import { useContract, useProvider, useSigner } from "wagmi";
import loading_infinite from "../assets/scan-loader.gif";
import { ethers } from "ethers";
import Web3 from "web3";

function Home() {
  const [loading, setLoading] = useState(true);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const dataFetchedRef = useRef(false);
  const navigate = useNavigate();
  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: fluidPay_api,
    signerOrProvider: provider,
  });
  let platformsAddresses_array = [];

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    //function to fetch data
    const fetch = async () => {
      console.log("inside fetch");
      platformsAddresses_array =
        // eslint-disable-next-line react-hooks/exhaustive-deps
        await connectedContract.getAllPlatformsAddress();
      console.log("platfroms addresses");
      console.log(platformsAddresses_array);

      for (let i = 0; i < platformsAddresses_array.length; i++) {
        let metadata_tx = await connectedContract.getPlatformData(
          platformsAddresses_array[i]
        );
        // metadata.push(metadata_tx);
        if (platformsAddresses_array.length > metadata.length) {
          metadata.push({
            address: metadata_tx[0],
            name: metadata_tx[1],
            image: metadata_tx[2],
            description: metadata_tx[3],
            ph_address: metadata_tx[4],
            charges: parseInt(metadata_tx[5]),
          });
        }

        console.log(parseInt(metadata_tx[5]));
        //   console.log(metadata_tx);
      }
      console.log("Platforms's metadata");
      console.log(metadata);
      setLoading(false);
    };
    fetch();
    return () => {
      dataFetchedRef.current = true;
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
    <>
      <div className="Explore-main">
        <h2 className="heading">Available Platforms</h2>
        <div className="card-main">
          {metadata.map((item, key) => {
            return (
              <div
                className="card"
                key={key}
                onClick={() => {
                  navigate(`/organization/${item.address}`, {
                    state: {
                      name: item.name,
                      image: item.image,
                      address: item.ph_address,
                      desc: item.description,
                      charges: item.charges,
                    },
                  });
                }}
              >
                <div className="card-logo">
                  <img
                    src={`${item.image}`}
                    alt="oraganization-logo"
                    width="64px"
                    height="64px"
                  />
                  <div className="card-title-div">
                    <h3 className="card-title">{item.name}</h3>
                  </div>
                </div>
                <div className="card-details">
                  <div className="card-description">
                    <p>{item.description}</p>
                  </div>
                  <p className="card-charges">
                    Charges -{" "}
                    <span>
                      {Web3.utils.fromWei(`${item.charges * 60}`, "ether")}
                      {/* {ethers.utils.parseEther(toString(item.charges * 60))} */}
                    </span>{" "}
                    ETHx / hour
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="steps">
        <h2>Test Instructions</h2>
        <hr />
        <div className="steps-one">
          <div className="left">
            <h3>Step - 1</h3>
          </div>
          <div className="right">
            <p>Stake ETH on Goerli. You will receive DAIx.</p>
            <button className="steps-one-btn">Stake</button>
          </div>
        </div>
        <hr />
        <div className="steps-two">
          <div className="left">
            <h3>Step - 2</h3>
          </div>
          <div className="right">
            <p>
              Consider you are entering a premises which charges based on time
              of use. Scan this QR to start stream.
            </p>
            <img src={qr1} alt="QR code" />
          </div>
        </div>
        <hr />
        <div className="steps-three">
          <div className="left">
            <h3>Step - 3</h3>
          </div>
          <div className="right">
            <p>You have used the premises. End the stream.</p>
            <img src={qr1} alt="QR code" />
          </div>
        </div>
      </div>
      <div className="footer">
        <hr />
        <h2>Hacked at ETHIndia</h2>
      </div> */}
      </div>
    </>
  );
}

export default Home;
