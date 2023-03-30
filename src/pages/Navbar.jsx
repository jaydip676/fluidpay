import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import logo from "../assets/logo.png";
import "../styles/navbar.scss";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  let navigate = useNavigate();
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [connected, setConnection] = useState(false);

  const connectWallet = () => {
    connect();
  };

  // useEffect(() => {
  //   if (isConnected) {
  //     setConnection(true);
  //   } else {
  //     setConnection(false);
  //   }
  // }, [isConnected]);

  // useEffect(() => {
  //   if (isConnected) {
  //     setConnection(true);
  //   } else {
  //     setConnection(false);
  //   }
  // }, []);
  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <h1>FluidPay</h1>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <div className="navtextstyle">Home</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              <div className="navtextstyle">Register</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/explore" className="nav-link">
              <div className="navtextstyle">Explore</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/platform-profile" className="nav-link">
              <div className="navtextstyle">My Platform</div>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/exchange" className="nav-link">
              <div className="navtextstyle">Exchange</div>
            </Link>
          </li> */}

          {connected ? (
            <>
              {/* <li className="nav-item">
                <Link to="/browse" className="nav-link">
                  <div className="navtextstyle">Browse</div>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/transaction" className="nav-link">
                  <div className="navtextstyle">Transaction</div>
                </Link>
              </li> */}
              <li className="nav-item">
                <ConnectButton
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                />
              </li>
            </>
          ) : (
            <li className="nav-item">
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />
            </li>
          )}
        </ul>
        <div
          className="nav-ham-menu"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <MenuIcon />
        </div>
        {menu ? (
          <div className="mobile-menu">
            <ul>
              <li>
                <span
                  onClick={() => {
                    navigate("/");
                    setMenu(!menu);
                  }}
                >
                  Home
                </span>
              </li>

              <li>
                <span
                  onClick={() => {
                    navigate("/register");
                    setMenu(!menu);
                  }}
                >
                  Register
                </span>
              </li>

              <li>
                <span
                  onClick={() => {
                    navigate("/explore");
                    setMenu(!menu);
                  }}
                >
                  Explore
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    navigate("/platform-profile");
                    setMenu(!menu);
                  }}
                >
                  My platform
                </span>
              </li>
              {/* <li>
                <span
                  onClick={() => {
                    navigate("/exchange");
                    setMenu(!menu);
                  }}
                >
                  Exchange
                </span>
              </li> */}

              {connected ? (
                <>
                  {/* <li>
                    <span
                      onClick={() => {
                        navigate("/browse");
                        setMenu(!menu);
                      }}
                    >
                      Browse
                    </span>
                  </li>

                  <li>
                    <span
                      onClick={() => {
                        navigate("/transaction");
                        setMenu(!menu);
                      }}
                    >
                      Transaction
                    </span>
                  </li> */}

                  <li>
                    <ConnectButton
                      accountStatus={{
                        smallScreen: "avatar",
                        largeScreen: "full",
                      }}
                      showBalance={{
                        smallScreen: false,
                        largeScreen: true,
                      }}
                    />
                  </li>
                </>
              ) : (
                <li>
                  <ConnectButton
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "full",
                    }}
                    showBalance={{
                      smallScreen: false,
                      largeScreen: true,
                    }}
                  />
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </nav>
    </>
  );
}

export default Navbar;
