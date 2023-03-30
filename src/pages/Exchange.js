import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab, Content } from "./Tab";
import Etherium from "../assets/Ethereum-cropped.svg";
import "../styles/exchange.scss";

const Exchange = () => {
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  return (
    <div className="exchange-main">
      <div className="exchange-sub">
        <Tabs>
          <Tab onClick={handleClick} active={active === 0} id={0}>
            Wrap
          </Tab>

          <Tab onClick={handleClick} active={active === 1} id={1}>
            Unwrap
          </Tab>
        </Tabs>
        <>
          <Content active={active === 0}>
            <div className="exchange-box">
              <div className="exchange-box1">
                <input className="exchange-text" type="Text" />
                <img className="exchange-img1" src={Etherium} />
                <div className="exchange-word">ETH</div>
              </div>

              <div className="exchange-box2">
                <input className="exchange-text" type="Text" />
                <img className="exchange-img2" src={Etherium} />
                <div className="exchange-word">ETHx</div>
              </div>
              <h2>1 ETH = 1 ETHx</h2>
              <button className="exchange-btn">Wrap</button>
            </div>
          </Content>
          <Content active={active === 1}>
            <div className="exchange-box">
              <div className="exchange-box1">
                <input className="exchange-text" type="Text" />
                <img className="exchange-img1" src={Etherium} />
                <div className="exchange-word">ETHx</div>
              </div>
              <div className="exchange-box2">
                <input className="exchange-text" type="Text" />
                <img className="exchange-img2" src={Etherium} />
                <div className="exchange-word">ETH</div>
              </div>
              <h2>1 ETHx = 1 ETH</h2>
              <button className="exchange-btn">Unwrap</button>
            </div>
          </Content>
        </>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Exchange />, rootElement);

export default Exchange;
