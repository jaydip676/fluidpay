import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "./pages/Navbar";
import Landing, { metadata } from "./pages/Landing";
import Explore from "./pages/Explore";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";
import SinglePage from "./pages/SinglePage";
import orgs from "./DynamicComponentsData";
import FetchData from "./pages/FetchData";
import StreamEnd from "./pages/StreamEnd";
import PlatformProfile from "./pages/PlatformProfile";
import Exchange from "./pages/Exchange";

function App() {
  const { chains, provider } = configureChains(
    [goerli, polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "projectone",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Landing />} />

              <Route path="/explore" element={<Explore />}></Route>

              <Route
                exact
                path="organization/:id"
                element={
                  <SinglePage
                  // title={item.name}
                  // desc={item.description}
                  // OrgsAddress={item.address}
                  // charges={item.charges}
                  // image={item.image}
                  />
                }
              />
              <Route
                exact
                path="organization/stream-end/:id"
                element={
                  <StreamEnd
                  // title={item.name}
                  // desc={item.description}
                  // OrgsAddress={item.address}
                  // charges={item.charges}
                  // image={item.image}
                  />
                }
              />
              <Route path="/browse/:id" element={<Browse />} />
              <Route path="/register" element={<Register />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/fetch-data" element={<FetchData />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route
                path="/platform-profile"
                element={<PlatformProfile />}
              ></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
export default App;
