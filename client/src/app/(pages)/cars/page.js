"use client";
import { useAuth } from "@/app/utils/authContext";
import Loader from "@/app/utils/Loader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Carousel from "@/app/components/Carousel";

export default function Cars() {
  const { auth, setAuth } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [carData, setCarData] = useState([]);
  const [isDetail, setIsDetails] = useState(false);
  const [carDetail, setCarDetail] = useState([]);

  useEffect(() => {
    if (!auth.token) {
      const timeoutId = setTimeout(() => {
        router.push("/");
      }, 400);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line
  }, [auth.token, router]);

  // ALl Car Models

  const getCarModels = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cars/allCars`
      );
      console.log("data:", data);
      setCarData(data.cars);
      console.log("cars:", data.cars);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getCarModels();
  }, []);

  // Get Single Car
  const getCarDetail = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/cars/single_Model/${id}`
      );
      setCarDetail(data.car);
      console.log("cars:", data);
      console.log("carsD:", carDetail);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    router.push("/");
    setAuth({ ...auth, user: "", token: "" });
    localStorage.clear("auth");
    toast.success("Logout successfully!");
  };

  return (
    <div className="w-full min-h-screen py-4 px-4 relative">
      {/* Logout */}
      <span
        className="absolute top-4 right-4 cursor-pointer"
        onClick={handleLogout}
        title="Logout"
      >
        <RiLogoutCircleRLine className="h-6 w-6 text-sky-600 hover:text-red-600 transition-all duration-150" />
      </span>
      {/* Main */}

      {!auth.token || isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 w-full min-h-screen">
          <h1 className="tgradient text-4xl font-bold text-center">
            Cars Models
          </h1>
          <div className="w-full flex items-center justify-end  mr-2 sm:mr-8 pb-5">
            <button
              className="py-[.4rem] px-4 rounded-[.5rem] cursor-pointer shadow-md shadow-gray-100 hover:shadow-gray-300 transition-all duration-150 flex items-center justify-center text-white bg-sky-600 hover:bg-sky-700"
              onClick={() => router.push("/uploadModel")}
            >
              <FiPlus className="h-4 w-4 text-white" /> Add New
            </button>
          </div>
          {/* All Car Models */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {carData &&
              carData?.map((item) => (
                <div
                  className="w-full h-full rounded-md shadow-md border bg-gray-100 border-gray-300 overflow-hidden  shadow-gray-100 hover:shadow-gray-300 transition-all duration-150 cursor-pointer"
                  key={item?._id}
                  onClick={() => {
                    getCarDetail(item?._id), setIsDetails(true);
                  }}
                >
                  <div className="w-full h-[15rem] relative border-b border-gray-200">
                    <Image src={item?.images[0]} fill alt="Banner" />
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-4">
                    <h3 className="font-[500] text-black text-[18px]">
                      {item?.carModel}
                    </h3>
                    <span className="text-lg font-medium text-sky-600">
                      ${item?.price}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Details */}
      {isDetail && (
        <div className="fixed top-0 right-0 py-4 px-4 w-full h-full z-[9] bg-black/70 flex items-center justify-center">
          {Loading ? (
            <Loader />
          ) : (
            <div className="py-4 px-4 w-[22rem] sm:w-[37rem] overflow-hidden rounded-lg bg-white relative">
              <span
                className="absolute top-2 right-3 cursor-pointer z-[10]"
                onClick={() => setIsDetails(false)}
              >
                <IoClose className="h-6 w-6 text-black cursor-pointer" />
              </span>
              <div className="flex flex-col gap-4 mt-4">
                <Carousel banners={carDetail?.images} />
                <div className="flex flex-col gap-2 px-4 py-4">
                  <h3 className="font-[500] text-black text-[20px]">
                    {carDetail?.carModel}
                  </h3>
                  <span className="text-lg font-medium w-fit text-sky-600 py-[.25rem] px-5 bg-sky-600/10 rounded-[1.5rem]">
                    ${carDetail?.price}
                  </span>
                  <div className="flex items-center  justify-between gap-4">
                    <span className="text-lg font-medium w-fit text-gray-800">
                      {carDetail?.city}
                    </span>
                    <span className="text-lg font-medium w-fit text-gray-800  ">
                      {carDetail?.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
