// import React from "react";
// import { useForm } from "react-hook-form";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <div>
//       <div>
//         <h2 className="font-bold text-3xl ">MoveXpress</h2>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//         <fieldset className="fieldset">
//           <label className="label">Email</label>
//           <input
//             type="email"
//             {...register("email")}
//             className="input"
//             placeholder="Email"
//           />

//           <label className="label">Password</label>
//           <input
//             type="password"
//             {...register("password", { required: true, minLength: 6 })}
//             className="input"
//             placeholder="Password"
//           />

//           {errors.password?.type === "required" && (
//             <p className="text-red-600" role="alert">
//               Password is required and must be at least 6 characters
//             </p>
//           )}
//           {errors.password?.type === "minLength" && (
//             <p className="text-red-600" role="alert">
//               Password must be at least 6 characters
//             </p>
//           )}

//           <div>
//             <a className="link link-hover">Forgot password?</a>
//           </div>
//         </fieldset>
//         <button className="btn btn-neutral mt-4">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center"
      >
        <h2 className="text-3xl md:text-4xl text-gray-900 font-semibold text-center">
          Sign in
        </h2>
        <p className="text-sm text-gray-500/90 mt-3 text-center">
          Welcome back! Please sign in to continue
        </p>
        {/* Google login button */}
        <button
          type="button"
          className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
        >
          <FcGoogle />
          <span className="ml-3 text-sm text-gray-700/90">
            Sign in with Google
          </span>
        </button>
        {/* Divider */}
        <div className="flex items-center gap-4 w-full my-5">
          <div className="flex-1 h-px bg-gray-300/90"></div>
          <p className="text-nowrap text-sm text-gray-500/90">
            or sign in with email
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
          Login
        </button>
        {/* Sign up link */}
        <p className="text-gray-500/90 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <a className="text-indigo-500 hover:underline" href="#">
            Sign up
          </a>
        </p>
      </form>
    </>
  );
};

export default Login;
