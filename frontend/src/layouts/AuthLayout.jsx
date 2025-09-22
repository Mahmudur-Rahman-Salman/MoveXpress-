// import React from "react";
// import { Outlet } from "react-router";
// import authenticationImage from "../assets/undraw_two-factor-authentication_8tds.png";

// const AuthLayout = () => {
//   return (
//     <div>
//       <div className="p-12 bg-base-200 min-h-screen">

//         <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
//           <div className="flex-1">
//             <img
//               src={authenticationImage}
//               className="max-w-sm rounded-lg shadow-2xl"
//             />
//           </div>
//           <div className="flex-1">
//             <Outlet></Outlet>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;

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
