import React from "react";
import { FcGoogle } from "react-icons/fc";
// import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from '../../../hooks/useAxios';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const from = location.state?.from || "/";

  const handleGoogleSignIn =() => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        console.log(result.user);
        // update userinfo in the database
        const userInfo = {
          email: user.email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const res = await axiosInstance.post("/users", userInfo);
        console.log("user update info", res.data);

        navigate(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full hover:bg-gray-500/20 transition"
      >
        <FcGoogle />
        <span className="ml-3 text-sm text-gray-700/90">
          Sign in with Google
        </span>
      </button>
    </>
  );
};

export default SocialLogin;
