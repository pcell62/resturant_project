"use client";
import React, { useState } from "react";

import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const Popup = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 h-screen">
        <div className="bg-white p-8 rounded-md shadow-md w-[600px]">
          <h2 className="text-2xl font-semibold mb-4 ">About Us</h2>
          <p>
            BigBites is a restaurant that offers a wide range of mouthwatering
            delights, from traditional classics to innovative creations. Savor
            the essence of diverse cuisines crafted with passion and served with
            a side of excitement. Join us on a journey of taste that&apos;s
            bound to leave you craving for more.
          </p>
          <button
            className="mt-4 bg-red-300 px-4 py-2 rounded-md"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <nav className="p-4  flex items-center  w-full bg-transparent font-Raleway rounded-b-lg z-30 ">
      <div className="flex items-center  gap-x-5 w-full max-w-[88rem] m-auto justify-between">
        <div className="flex gap-x-20 items-center">
          <Link href="/" className="flex items-center gap-x-2">
            <img src="logo.svg" alt="logo" className="h-12 w-12" />
            <p className="text-3xl font-extrabold honk tracking-wider samarakan">
              BigBites
            </p>
          </Link>
        </div>
        <div className="flex gap-x-5 text-black">
          <button
            className="flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider"
            onClick={openPopup}
          >
            About us
          </button>
          <Link href="/location">
            <button className="flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider">
              Location
            </button>
          </Link>
          <Link href="/menu">
            <button className="flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider">
              Today&apos;s Menu
            </button>
          </Link>

          <Link href="/order">
            <button className="flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider">
              Order Online
            </button>
          </Link>
        </div>
      </div>
      {isOpen && <Popup />}
    </nav>
  );
};

export default Header;
