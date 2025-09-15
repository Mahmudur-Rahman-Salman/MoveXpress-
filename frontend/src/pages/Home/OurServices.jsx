import React from "react";
import {
  FaShippingFast,
  FaBoxOpen,
  FaTruckMoving,
  FaGlobe,
  FaHandshake,
  FaClock,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaShippingFast className="text-4xl text-primary mb-4" />,
    title: "Fast Delivery",
    text: "Get your parcels delivered at lightning speed with our express service.",
  },
  {
    id: 2,
    icon: <FaBoxOpen className="text-4xl text-primary mb-4" />,
    title: "Secure Packaging",
    text: "Every package is handled with care and securely packed.",
  },
  {
    id: 3,
    icon: <FaTruckMoving className="text-4xl text-primary mb-4" />,
    title: "Door-to-Door Service",
    text: "We pick up from your doorstep and deliver right where you want.",
  },
  {
    id: 4,
    icon: <FaGlobe className="text-4xl text-primary mb-4" />,
    title: "Worldwide Shipping",
    text: "Send packages anywhere across the globe with ease.",
  },
  {
    id: 5,
    icon: <FaHandshake className="text-4xl text-primary mb-4" />,
    title: "Trusted Service",
    text: "Thousands of customers trust us for reliable delivery.",
  },
  {
    id: 6,
    icon: <FaClock className="text-4xl text-primary mb-4" />,
    title: "24/7 Support",
    text: "We’re here for you anytime with our round-the-clock support.",
  },
];

const OurServices = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="text-base-content/70 max-w-2xl mx-auto mb-12">
          We provide top-notch delivery solutions to ensure your goods reach
          their destination on time, safely, and hassle-free.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="card bg-base-200 shadow-md hover:shadow-lg transition rounded-2xl p-6 flex flex-col items-center text-center"
            >
              {service.icon}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-base-content/70">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
