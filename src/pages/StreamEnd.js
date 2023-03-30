import { useParams } from "react-router-dom";
import fluidPay_api from "../artifacts/fluidPay.json";
import { CONTRACT_ADDRESS } from "../config";
import { useContract, useProvider, useSigner } from "wagmi";
import React, { useEffect, useRef, useState } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import "../styles/streamend.scss";
import Web3 from "web3";

function StreamEnd() {
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
  const [charges, setCharges] = useState([]);
  const [duration, setDuration] = useState("");
  const [showRcpt, setRcpt] = useState();
  let metadata = [];

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    //function to fetch data
    const fetch = async () => {
      console.log("inside fetch");

      let metadata_tx = await connectedContract.getPlatformData(id);
      metadata.push(metadata_tx);
      console.log(metadata);
      setCharges(parseInt(metadata[0].platformChargesPerSecond));
      console.log(parseInt(metadata[0].platformChargesPerSecond));
      console.log(metadata[0].platformAddress);
      console.log(parseInt(metadata_tx[5]));
      console.log(metadata_tx);
      console.log("Platforms's metadata");
      // setCharges(parseInt(metadata_tx[0].platformChargesPerSecond));

      // setData(metadata_tx);
    };

    fetch();
    // deleteStream();
    return () => {
      dataFetchedRef.current = true;
    };
  }, []);

  const deleteStream = async () => {
    console.log(signer);
    console.log(provider);
    console.log(charges);
    const userAddress = await signer.getAddress();
    console.log(userAddress);
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });
    try {
      const ethx = await sf.loadSuperToken("ETHx");
      console.log("token address");
      console.log(ethx.address);

      //call to get stream start date
      const start = await sf.cfaV1.getFlow({
        superToken: ethx.address,
        sender: await signer.getAddress(),
        receiver: id,
        providerOrSigner: signer,
      });
      console.log(start);
      console.log("starttime:" + Date.parse(start.timestamp));
      // setStartTime(Date.parse(start.timestamp));
      const startTime = Date.parse(start.timestamp);

      // if (start) {
      // if (metadata) {
      // const charges = parseInt(metadata[0].platformChargesPerSecond);
      // console.log(charges);
      //to delete stream
      const deleteFlowOperation = sf.cfaV1.deleteFlow({
        flowRate: charges,
        sender: await signer.getAddress(),
        receiver: id,
        superToken: ethx.address,
        // userData?: string
      });

      console.log("Deleting your stream...");

      const result = await deleteFlowOperation.exec(signer);
      const receipt = await result.wait();
      console.log("transaction completed" + receipt);

      console.log(`Congrats - you've just deleted your money stream!`);
      if (receipt) {
        setRcpt(receipt);
        let end = await sf.cfaV1.getAccountFlowInfo({
          superToken: ethx.address,
          account: await signer.getAddress(),
          providerOrSigner: signer,
        });
        console.log(end);
        // console.log("end time:" + Date.parse(end.timestamp));
        // setEndTime(Date.parse(end.timestamp));
        const endTime = Date.parse(end.timestamp);
        console.log("startTime: " + startTime);
        console.log("endtime: " + endTime);
        const totalDuration = (endTime - startTime) / 1000;

        console.log("---------------------------------");
        console.log(totalDuration);
        setDuration(totalDuration);
        // }
      }
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="stream-end-main">
      <h2>Stream End</h2>
      <button onClick={() => deleteStream()}>End Stream</button>
      {showRcpt ? (
        <>
          <h2>
            Stream duration: <br></br>
            {duration / 60} minutes
          </h2>
          {/* <h2>Stream duration:</h2> */}

          <h2>
            Tokens transferred: <br></br>
            {Web3.utils.fromWei(`${duration * charges * 60}`, "ether")} ETHx
          </h2>
        </>
      ) : null}
    </div>
  );
}

export default StreamEnd;
