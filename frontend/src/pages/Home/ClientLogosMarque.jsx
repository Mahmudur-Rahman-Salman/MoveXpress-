import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../../assets/amazon.png";
import logo2 from "../../assets/casio.png";
import logo3 from "../../assets/moonstar.png";
import logo4 from "../../assets/randstad.png";
import logo5 from "../../assets/start.png";
import logo6 from "../../assets/amazon_vector.png";
import logo7 from "../../assets/start-people 1.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogosMarque = () => {
  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Trusted by Leading Companies
        </h2>

        <Marquee
          gradient={false} // disable fade effect
          speed={50} // adjust scrolling speed
          pauseOnHover={true} // pause when hovered
        >
          <div className="flex space-x-12">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`client-logo-${index}`}
                className="h-16 w-auto object-contain"
              />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default ClientLogosMarque;
