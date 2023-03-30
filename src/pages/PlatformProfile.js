import React, { useEffect, useRef, useState } from "react";
import "../styles/browse.scss";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import fluidPay_api from "../artifacts/fluidPay.json";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import qr1 from "../assets/wap.png";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import loading_infinite from "../assets/scan-loader.gif";

function PlatformProfile() {
  const [url, setUrl] = useState("");
  const [endUrl, setEndUrl] = useState("");
  const { chain } = useNetwork();
  const location = useLocation();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const dataFetchedRef = useRef(false);
  const navigate = useNavigate();
  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: fluidPay_api,
    signerOrProvider: provider,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(true);
  const canvasRef = useRef(null);
  const canvasRef1 = useRef(null);
  const [img, setImg] = useState(null);
  const downloadQRCode = (e) => {
    e.preventDefault();
    setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      ref={canvasRef}
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#fff"}
      level={"H"}
    />
  );
  const endQrcode = (
    <QRCodeCanvas
      ref={canvasRef1}
      id="qrCode1"
      value={endUrl}
      size={300}
      bgColor={"#fff"}
      level={"H"}
    />
  );
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    // const { address } = useAccount();

    //   //function to fetch data
    //   const fetch = async () => {
    //     console.log("inside fetch");
    //     //   platformsAddresses_array =
    //     //     await connectedContract.getAllPlatformsAddress();
    //     //   console.log("platfroms addresses");
    //     //   console.log(platformsAddresses_array);
    //     console.log(location.state.address);
    //     let metadata_tx = await connectedContract.getPlatformData(
    //       location.state.address
    //     );

    //     console.log(metadata_tx);
    //     if (!data.length > 0)
    //       data.push({
    //         address: metadata_tx[0],
    //         name: metadata_tx[1],
    //         image: metadata_tx[2],
    //         description: metadata_tx[3],
    //         ph_address: metadata_tx[4],
    //         charges: parseInt(metadata_tx[5]),
    //       });
    //     setLoading(false);
    //     // setData(data);

    //     console.log(parseInt(metadata_tx[5]));
    //     console.log(data);

    //     //   console.log(metadata_tx);

    //     console.log("Platforms's metadata");
    //     //   console.log(metadata);
    //     console.log(`http://localhost:3000/organization/${metadata_tx[0]}`);
    //     // setUrl(`http://localhost:3000/organization/${metadata_tx[0]}`);    https://fluid-pay.vercel.app/organization/0xcc920c851327AF767b4bf770e3b2C2ea50B90fde
    //     setUrl(`https://fluid-pay.vercel.app/organization/${metadata_tx[0]}`);
    //     setEndUrl(
    //       `https://fluid-pay.vercel.app/organization/stream-end/${metadata_tx[0]}`
    //     );
    //   };
    //   fetch();

    const fetchFromAddress = async () => {
      console.log("inside fetch");
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log(provider);
        console.log(signer);
        const address = await signer.getAddress();
        console.log(address);
        //   platformsAddresses_array =
        //     await connectedContract.getAllPlatformsAddress();
        //   console.log("platfroms addresses");
        //   console.log(platformsAddresses_array);
        // console.log(location.state.address);
        let metadata_tx = await connectedContract.getPlatformData(address);

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
        setData(data);
        setUrl(`https://fluid-pay.vercel.app/organization/${metadata_tx[0]}`);
        setEndUrl(
          `https://fluid-pay.vercel.app/organization/stream-end/${metadata_tx[0]}`
        );

        console.log(parseInt(metadata_tx[5]));
        console.log(data);

        if (data[0].address == "0x0000000000000000000000000000000000000000") {
          console.log("inside if");
          setRegistered(false);
        }

        //   console.log(metadata_tx);

        console.log("Platforms's metadata");
        //   console.log(metadata);
      }
    };
    fetchFromAddress();
    return () => {
      setData(data);
    };
  }, []);

  const saveImageToLocal = () => {
    // let link = event.currentTarget;
    const a = document.createElement("a");
    // document.body.appendChild(a);
    console.log(a);
    const canvas = document.getElementById("qrCode");
    var image = canvas.toDataURL("image/png");
    a.download = "QR-Start";
    a.href = image;
    a.click();
    // setImg(image);
    // link.setAttribute("download", "canvas.png");
    // let image = canvasRef.current.toDataURL("image/png");
    // link.setAttribute("href", image);
  };

  const saveImageToLocal1 = () => {
    // let link = event1.currentTarget;
    const a = document.createElement("a");
    // document.body.appendChild(a);
    console.log(a);
    const canvas = document.getElementById("qrCode1");
    var image = canvas.toDataURL("image/png");
    a.download = "QR-End";
    a.href = image;
    a.click();
    // setImg(image);
    // link.setAttribute("download", "canvas.png");
    // let image = canvasRef.current.toDataURL("image/png");
    // link.setAttribute("href", image);
  };

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
  if (!registered)
    return (
      <div className="not-registered">
        <h1>You Haven't Registered</h1>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    );
  else {
    return (
      <>
        <div className="browse-main">
          <h2 className="browse-header">My platform</h2>
          <div className="browse-platform-name">{data[0].name}</div>
          <div className="browse-platform-details">{data[0].description}</div>
          <div className="browse-qr-main">
            <div className="browse-qr-start">
              <h3 className="browse-qr-header">Start Stream</h3>
              <div className="qrcode__container">
                <div className="browse-qr-img">{qrcode}</div>
                <div className="input__group">
                  <form onSubmit={downloadQRCode}>
                    {/* <label>URL</label>
                  <input
                    type="text"
                    value={url}
                    onChange={qrCodeEncoder}
                    placeholder="https://qr.com"
                  /> */}
                    {/* <button type="submit" disabled={!url}>
                    Download QR code
                  </button> */}
                  </form>
                </div>
              </div>
            </div>
            <div className="browse-qr-end">
              <h3 className="browse-qr-header">End Stream</h3>
              <div className="qrcode__container">
                <div className="browse-qr-img">{endQrcode}</div>
                {/* <div className="input__group">
                  <form onSubmit={downloadQRCode}></form>
                </div> */}
              </div>
            </div>
          </div>
          <button
            id="download_image_link"
            className="browse-btn"
            href="download_link"
            onClick={() => {
              saveImageToLocal();
              saveImageToLocal1();
            }}
          >
            Download QR Code
          </button>
        </div>
      </>
    );
  }
}

export default PlatformProfile;
