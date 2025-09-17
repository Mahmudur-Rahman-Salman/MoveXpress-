import React from "react";
import locationMerchant from "../../assets/location-merchant.png";
import bgMerchant from "../../assets/be-a-merchant-bg.png";

const Bemarchant = () => {
  return (
    <div>
      <div
        data-aos="flip-up"
        className="hero bg-[#03373D] bg-cover bg-center bg-no-repeat p-20"
        style={{ backgroundImage: `url(${bgMerchant})` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={locationMerchant}
            alt="locationMerchant"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold text-white">
              Merchant and Customer Satisfaction is our first priority
            </h1>
            <p className="py-6 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary rounded-full">
              Become a Merchant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bemarchant;
