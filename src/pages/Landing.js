import { useEffect, useRef } from "react";
import React from "react";
import "../styles/landing.scss";
import HomeImg1 from "../assets/1.png";
import HomeImg2 from "../assets/2.1.png";
import { useNavigate } from "react-router-dom";
import heroimg from "../assets/scan-and-pay.gif";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";

// import Btn from "../assets/Asset2.svg";

export let metadata = [];

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero-main">
        <div className="hero-left">
          <h1>Scan the QR-code and pay in stream of tokens</h1>
          <p>
            Scan the QR-code and Pay in stream instead of directly sending it
          </p>
          <button className="home-mid-btn" onClick={() => navigate("/explore")}>
            Let's Go!
          </button>
        </div>
        <div className="hero-right">
          {/* {/* <img className="home-main-img1" alt="bank" src={HomeImg1} /> */}
          <img className="hero-img" alt="cryptoimg" src={heroimg} />
        </div>
      </div>
    </>
  );
}

export default Landing;
