import React from "react";
import Banner from "./Banner";
import OurServices from "./OurServices";
import ClientLogosMarque from "./ClientLogosMarque";
import Benifits from "./Benifits";
import Bemarchant from "./Bemarchant";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <OurServices></OurServices>
      <ClientLogosMarque></ClientLogosMarque>
      <Benifits></Benifits>
      <Bemarchant></Bemarchant>
      <Reviews></Reviews>
    </>
  );
};

export default Home;
