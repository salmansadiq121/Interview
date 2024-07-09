"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { useAuth } from "@/app/utils/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/user/login_user`,
        { email, password }
      );
      if (data) {
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        setLoading(false);
        route.push("/cars");
        toast.success("Login successfully!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-[21rem] sm:w-[28rem] bg-gray-100 py-[1.2rem] px-4 rounded-md shadow-md shadow-gray-300  transition-all duration-150 ">
      <h1 className="w-full text-center text-2xl sm:text-3xl font-medium text-gray-950 pb-5">
        Sign In
      </h1>
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="inputBox">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <span>Email</span>
        </div>
        <div className="inputBox relative w-full">
          <div
            className=" absolute top-[.9rem] right-3 z-10"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <FaRegEye className="h-5 w-5 text-gray-950 cursor-pointer" />
            ) : (
              <FaRegEyeSlash className="h-5 w-5 text-gray-950 cursor-pointer" />
            )}
          </div>
          <input
            type={show ? "text" : "password"}
            required
            value={password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <span>Password</span>
        </div>
        <div className="flex items-center justify-end pr-4 mt-4">
          <button className=" py-[.5rem] px-6 rounded-[2rem] cursor-pointer shadow-md shadow-gray-100 hover:shadow-gray-300 transition-all duration-150 flex items-center justify-center text-white bg-sky-600 hover:bg-sky-700">
            {loading ? (
              <BiLoaderAlt className="h-5 w-5 animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
