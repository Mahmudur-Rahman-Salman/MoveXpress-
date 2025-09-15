import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import banner1 from "../../assets/banner1.png"; 
import banner2 from "../../assets/banner2.png"; 
import banner3 from "../../assets/banner3.png"; 



const Banner = () => {
  return (
    <>
      <Carousel autoPlay={true} infiniteLoop={true} interval={2000} showThumbs={false}> 
        <div>
          <img src={banner1} />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={banner2} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={banner3} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
