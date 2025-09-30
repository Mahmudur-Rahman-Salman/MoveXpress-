import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      console.log("User:", result.user);
    } catch (error) {
      console.error("Google sign-in error:", error.code, error.message);
    }
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
