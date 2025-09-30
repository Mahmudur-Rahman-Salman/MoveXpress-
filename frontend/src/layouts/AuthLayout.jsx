import React from "react";
import { Outlet } from "react-router";
import authenticationImage from "../assets/authenticaion_image.jpg";

const AuthLayout = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen w-full">
        {/* left side form */}
        <div className="flex w-full md:w-1/2 items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        {/* Right side image */}
        <div className="hidden md:flex md:w-1/2 bg-gray-50 items-center justify-center">
          <img
            src={authenticationImage}
            alt="Authentication Illustration"
            className="w-full h-full object-contain p-8"
          />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
