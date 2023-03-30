import React, { useState, useEffect, useRef } from "react";
import UploadHeroImage from "./Upload";
import "../styles/register.scss";
import axios from "axios";
import { CONTRACT_ADDRESS } from "../config";
import {
  useProvider,
  useSigner,
  useAccount,
  useNetwork,
  useContract,
} from "wagmi";
import fluidPay_api from "../artifacts/fluidPay.json";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

function Register() {
  const navigate = useNavigate();
  console.log(CONTRACT_ADDRESS);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  // const [userImage, setUserImage] = useState("");

  const heroImage = useRef(null);
  const inputRef = useRef(null);

  // const num = "1";
  // const num2 = ethers.utils.parseEther(num);
  // console.log(parseInt(num2));

  //platform details useStates
  // const [platformAddress, setPlatformAddress] = useState("");
  // const [platformName, setPlatformName] = useState("");
  // const [platformDescription, setPlatformDescriptione] = useState("");
  // const [platformPhysicalAddress, setPlatformPhysicalAddress] = useState("");
  // const [platformChargesPerSecond, setPlatformChargesPerSecond] = useState("");
  const [platformData, setplatformData] = useState([]);
  // const [parseValue, setParseValue] = useState([]);
  // setParseValue(ethers.utils.parseEther("1000"));

  const connectedContract = useContract({
    address: CONTRACT_ADDRESS,
    abi: fluidPay_api,
    signerOrProvider: signer,
  });

  const registerPlatform = async (e) => {
    console.log(platformData);
    const registerPlatformTx = await connectedContract.addPlatform(
      address,
      platformData.platformName,
      platformData.platformImage,
      platformData.platformDescription,
      platformData.platformPhysicalAddress,
      platformData.platformChargesPerSecond
    );
    const receipt = await registerPlatformTx.wait();
    console.log(receipt);
    if (receipt) {
      navigate(`/browse/${address}`, { state: { address: address } });
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const uploadImage = async (e) => {
    const profile_image = e.target.files[0];
    console.log(profile_image);

    const form = new FormData();
    form.append("file", profile_image);

    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/files",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
        Authorization: "d371605c-bf67-4bb5-ae3e-dace4ac6810e",
      },
      data: form,
    };
    console.log(options);

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data.ipfs_url);
        setplatformData({
          ...platformData,
          platformImage: response.data.ipfs_url,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const reset = () => {
    setplatformData({
      ...platformData,
      platformImage: "",
    });
    // heroImage.current.target.files[0] = null;
  };

  return (
    <>
      <div className="register-bg">
        <h1 className="register-header">Register</h1>
        <div className="register-main">
          <input
            ref={inputRef}
            className="register-item-1"
            type="text"
            placeholder="Platform Name"
            onChange={(e) =>
              setplatformData({ ...platformData, platformName: e.target.value })
            }
          />
          <input
            className="register-item-2"
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setplatformData({
                ...platformData,
                platformDescription: e.target.value,
              })
            }
          />
          <input
            className="register-item-3"
            type="text"
            placeholder="Physical Address"
            onChange={(e) =>
              setplatformData({
                ...platformData,
                platformPhysicalAddress: e.target.value,
              })
            }
          />
          <input
            className="register-item-2"
            type="text"
            placeholder="Enter charges per hour in ETH"
            onChange={(e) =>
              setplatformData({
                ...platformData,
                platformChargesPerSecond: Math.ceil(
                  parseInt(ethers.utils.parseEther(`${e.target.value}`)) / 60
                ),
              })
            }
          />
          <div className="register-featured-image">
            {platformData.platformImage ? (
              <>
                <img
                  src={platformData.platformImage}
                  className="register-uploaded-image"
                  alt="upload"
                  width={"128px"}
                />
                <button
                  className="reg-img-cancelbtn"
                  onClick={() => {
                    reset();
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <div
                onClick={(e) => {
                  heroImage.current.click();
                }}
              >
                <UploadHeroImage />
              </div>
            )}
            <input
              type="file"
              name="hero-image"
              className="register-input-featured-image"
              ref={heroImage}
              onChange={(e) => {
                uploadImage(e);
              }}
              hidden
            />
          </div>
          {platformData.platformChargesPerSecond ? (
            <h2>{platformData.platformChargesPerSecond} Wei / sec</h2>
          ) : (
            <h2>0 Wei / sec</h2>
          )}

          {platformData.platformImage ? (
            <button className="register-btn" onClick={() => registerPlatform()}>
              Register
            </button>
          ) : (
            <button
              disabled
              className="register-btn-disabled"
              onClick={() => registerPlatform()}
            >
              Register
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
