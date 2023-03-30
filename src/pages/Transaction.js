import "../styles/transaction.scss";
import ETH from "../assets/eth.svg";
import { useLocation } from "react-router-dom";
import { Framework } from "@superfluid-finance/sdk-core";
import React, { useEffect, useRef, useState } from "react";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";
import Web3 from "web3";

const Transaction = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    getflowData();
  }, []);

  const getflowData = async () => {
    const sf = await Framework.create({
      chainId: 80001,
      provider: provider,
    });
    const ethx = await sf.loadSuperToken("ETHx");
    console.log(ethx);
    console.log(typeof ethx);
    console.log(signer.getAddress());
    try {
      let res = await sf.cfaV1.getFlow({
        superToken: "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947",
        sender: await signer.getAddress(),
        receiver: "0xbFc4A28D8F1003Bec33f4Fdb7024ad6ad1605AA8",
        providerOrSigner: signer,
      });
      console.log(res);
      console.log(res.timestamp);
      console.log(Date.parse(res.timestamp));
      // return res;

      let res2 = await sf.cfaV1.getNetFlow({
        superToken: "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947",
        account: await signer.getAddress(),
        providerOrSigner: signer,
      });

      let res3 = await sf.cfaV1.getAccountFlowInfo({
        superToken: "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947",
        account: await signer.getAddress(),
        providerOrSigner: signer,
      });
      console.log(res);
      console.log(res2);
      console.log(res3);
    } catch (error) {
      console.error(error);
    }
  };
  const location = useLocation();
  console.log(location.state.s_address);
  console.log(location.state.r_address);
  return (
    <>
      <div className="transcation-main">
        <h2 className="transaction-header">Stream started</h2>
        <div className="transaction-top">
          <img className="transaction-img" src={ETH} alt="trasaction" />
          <h1 className="transaction-top-1">Flowrate</h1>
          <h2 className="transaction-top-2">
            {Web3.utils.fromWei(`${location.state.charges * 60}`, "ether")} ETHx
            / hour
            {/* {location.state.charges} ETHx(wei) / sec */}
          </h2>
        </div>
        <div className="transaction-mid">
          <div className="transaction-send-receive">
            <h3 className="transaction-send-receive-header">Sender</h3>
            <div className="transaction-send-receive-div">
              {location.state.s_address}
            </div>
          </div>
          <div className="cloud-main">
            <div id="clouds">
              <div class="cloud x1"></div>
              <div class="cloud x2"></div>
              <div class="cloud x3"></div>
              <div class="cloud x4"></div>
              <div class="cloud x5"></div>
              <div class="cloud x6"></div>
              <div class="cloud x7"></div>
            </div>
          </div>
          <div className="transaction-send-receive">
            <h3 className="transaction-send-receive-header">Receiver</h3>
            <div className="transaction-send-receive-div">
              {location.state.r_address}
            </div>
          </div>
        </div>
        {/* <div className="transaction-mid-bottom">
          <h4 className="transaction-mid-bottom-1">1045.0219452</h4>
          <h4 className="transaction-mid-bottom-2">USDCx</h4>
          <h4 className="transaction-mid-bottom-3">Per Month</h4>
        </div> */}
        {/* <div className="transaction-bottom">
          <div className="transaction-bottom-left">
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">Start Date</h4>
              <h4 className="transaction-bottom-sub-main-2">
                5 May 2022 at 12:00 GMT
              </h4>
            </div>
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">End Date</h4>
              <h4 className="transaction-bottom-sub-main-2">Never</h4>
            </div>
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">
                Project Liquidation
              </h4>
              <h4 className="transaction-bottom-sub-main-2">14 Aug 2022</h4>
            </div>
          </div>
          <div className="transaction-bottom-right">
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">Buffer</h4>
              <h4 className="transaction-bottom-sub-main-2">80.54992 USDCx</h4>
            </div>
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">Network Name</h4>
              <h4 className="transaction-bottom-sub-main-2">Gnosis Chain</h4>
            </div>
            <div className="transaction-bottom-sub-main">
              <h4 className="transaction-bottom-sub-main-1">Transaction ID</h4>
              <h4 className="transaction-bottom-sub-main-2">Some Random ID</h4>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Transaction;
