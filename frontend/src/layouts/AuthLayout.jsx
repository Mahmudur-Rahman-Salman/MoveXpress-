import React from "react";
import { Outlet } from "react-router";
import authenticationImage from "../assets/undraw_two-factor-authentication_8tds.png";

const AuthLayout = () => {
  return (
    <div>
      <div className="p-12 bg-base-200 ">
        <div>
          <h2 className="font-bold text-3xl">MoveXpress</h2>
        </div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1">
            <img
              src={authenticationImage}
              className="max-w-sm rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
