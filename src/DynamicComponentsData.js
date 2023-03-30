// import { ethers } from "ethers";
// import fluidPay_abi from "./artifacts/fluidpay.json";
// import { useEffect } from "react";
// import React from "react";
// const CONTRACT_ADDRESS = "0x6Af9B5173136696273F2985401589C20D0fa5967";

// const getPlatformDetails = async () => {
//   console.log("getting");
//   if (typeof window.ethereum !== "undefined") {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     const signer = provider.getSigner();
//     console.log("inside id");
//     console.log(fluidPay_abi);

//     const connectedContract = new ethers.Contract(
//       CONTRACT_ADDRESS,
//       fluidPay_abi,
//       signer
//     );
//     console.log("wait...");
//     let tx = await connectedContract.addressToPlatform(
//       "0xbFc4A28D8F1003Bec33f4Fdb7024ad6ad1605AA8"
//     );
//     console.log(tx);
//   }
// };

// function DynamicComponentsData() {
//   useEffect(() => {
//     getPlatformDetails();
//   }, []);
//   return <></>;
// }
import { metadata } from "./pages/Landing";

let arr = [];

metadata.map((item, key) => {
  arr.push(item);
});

let orgs = [
  {
    name: "Visvesvaraya lol Industrial and Technological Museum",
    description:
      "Visvesvaraya Museum is fun for children and adults. It houses a treasure trove of machines and artifacts related to science and technology. Its interactive exhibits make this a great place for children to develop a love for science. There are exhibition Halls on Engines, Electricity, Fun Science, Space, Biotechnology & Electronics. Animated dinosaurs,life-size model of Wright Brothers' flyer and Steam locomotive are other attractions.There are interesting shows like 'Science on a sphere', 'Taramandal', '3d film show' and 'Science show' held at regular intervals. The 'Science for Kids' gallery is the new addition to the Museum. This is a place designed for tiny tots to play unhindered and engage with science.",
    address:
      "5216 Kasthurba Road Cubbon Park, Gandhi Nagar, Bengaluru 560001 India",
    charges: 0.000001,
    image: "/images/vitm.jpg",
    route: "/visvesvaraya-industrial-and-technological-museum",
  },
  {
    name: "Lord Of The Drinks",
    description:
      "Effortlessly serving everywhere, Lord of the Drinks slays with every bite of amazing flavors and a huge array of liqueurs for your ecstatic every day. From flaunting its presence to the Asia’s Longest Bar, Lord of the Drinks has attained and embarked a long way to upgrade the nightlife of Delhi, Mumbai and Pune. It has become one of the favorites for the people, it caters and has achieved several awards for its services and fashionable class, successfully. Looking forward to woo the audience with the upcoming, experiential gastronomy and a new ‘high’. Lord of the Drinks is located in Whitefield, East Bangalore.",
    address:
      "Phoenix Marketcity, UG 70A N FF 69A,EAST, Whitefield Main Rd, Krishnarajapura, Bengaluru, Karnataka 560048",
    charges: 0.000001,
    image: "/images/lotd.webp",
    route: "/lord-of-the-drinks",
  },
  {
    name: "Lalbagh Botanical Garden",
    description:
      "Lalbagh Botanical Garden or simply Lalbagh, is an botanical garden in Bangalore, India, with an over 200-year history. First planned and laid out during the dalavaiship of Hyder Ali and later managed under numerous British Superintendents before Indian Independence.",
    address: " Mavalli, Bengaluru, Karnataka 560004",
    charges: 0.000001,
    image: "/images/lbbg.jpg",
    route: "/lalbagh-botanical-garden",
  },
  {
    name: "Wonderla Amusement Park",
    description:
      "Wonderla Holidays Limited, is the No. 1 amusement park operator in India. Promoted by Arun K. Chittilappilly and Kochouseph Chittilappilly, Wonderla currently owns and operates three amusement parks – one each in Kochi, Bangalore and Hyderabad respectively and a resort in Bangalore. Wonderla Kochi, spread over 35 acres of land, is thrilling visitors with 56 rides since 2000. Wonderla Bangalore, spanning over 82 acres, offers a spectacular range of entertainment with 61 rides. Wonderla Hyderabad, the latest edition in the portfolio, is spread over 50 acres and offers 43 attractions. Wonderla Amusement Park has been ranked No. 1 in India and No. 6 in Asia by TripAdvisor for 5 consecutive years. Wonderla Resort, located beside the amusement park in Bangalore, comprises of 84 luxury rooms, with amenities including 4 full-fledged banquet halls, multi cuisine restaurant, rest-o-bar and recreational facilities like a heated swimming pool, kid’s activity centre & a full fledged gym.",
    address: "Kochi, Hyderabad, Bengaluru",
    charges: 0.000001,
    image: "/images/wonderland.png",
    route: "/wonderla-amusement-park",
  },
];

export default orgs;
