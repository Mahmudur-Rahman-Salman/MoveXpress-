import React from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();

  const onSubmit = (data) => {
    // console.log(data);
    console.log(createUser);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center"
      >
        <Link
          to="/"
          className="font-extrabold text-3xl m-3 p-3 hover:bg-gray-100 "
        >
          Move<span className="text-amber-400">Xpress</span>
        </Link>
        <h2 className="text-3xl md:text-4xl text-gray-900 font-semibold text-center">
          Sign up
        </h2>
        <p className="text-sm text-gray-500/90 mt-3 text-center">
          Welcome back! Please sign in to continue
        </p>
        {/* Google login button */}
        <SocialLogin></SocialLogin>
        {/* Divider */}
        <div className="flex items-center gap-4 w-full my-5">
          <div className="flex-1 h-px bg-gray-300/90"></div>
          <p className="text-nowrap text-sm text-gray-500/90">
            or sign up with email
          </p>
          <div className="flex-1 h-px bg-gray-300/90"></div>
        </div>
        {/* Email input */}
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="email"
            {...register("email")}
            placeholder="Email id"
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>
        {/* Password input */}
        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Password"
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>
        {errors.password?.type === "required" && (
          <p className="text-red-600" role="alert">
            Password is required and must be at least 6 characters
          </p>
        )}{" "}
        {errors.password?.type === "minLength" && (
          <p className="text-red-600" role="alert">
            Password must be at least 6 characters
          </p>
        )}
        {/* Remember + Forgot password */}
        <div className="w-full flex items-center justify-between mt-6 text-gray-500/80 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" />
            Remember me
          </label>
          <a href="#" className="underline">
            Forgot password?
          </a>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          sign up
        </button>
        {/* Sign up link */}
        <p className="text-gray-500/90 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:underline"
            href="#"
          >
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
