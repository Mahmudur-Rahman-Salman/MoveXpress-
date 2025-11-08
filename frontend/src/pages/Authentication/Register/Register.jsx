import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();

  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path (where user came from or default "/")
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // update user info in the database
        const userInfo = {
          email: data.email,
          roles: "user", //default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);
        // update user profile
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };

        updateUserProfile(userProfile)
          .then(() => {
            console.log("Profile updated successfully");
            // ✅ Show success popup
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: "Welcome to MoveXpress 🎉",
              showConfirmButton: false,
              timer: 1500,
            });

            // ✅ Redirect after short delay
            setTimeout(() => {
              navigate(from, { replace: true }); // redirect to home page (or '/dashboard' if you prefer)
            }, 1500);
          })
          .catch((error) => {
            console.log("Error updating profile:", error);
          });
      })
      .catch((error) => {
        console.log(error.message);
        // ❌ Show error popup if registration fails
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`,
      formData
    );
    setProfilePic(res.data.data.display_url);
    console.log(res.data.data.display_url);
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
        {/* Image upload */}
        <div className="w-full mb-4">
          <input
            onChange={handleImageUpload}
            type="file"
            {...register("image")}
            accept="image/*"
            className="file-input file-input-bordered w-full"
            required
          />
        </div>
        {/* Submit */}
        {/* <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Sign Up"}
        </button> */}
        {/* Name Field */}
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 m-6">
          <input
            type="text"
            {...register("name")}
            placeholder="Your Name"
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
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
