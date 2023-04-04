import React from "react";
import { Avater, Avatars, Search } from "@/assets";
import Image from "next/image";

function SearchBar() {
  return (
    <>
      <div className="relative hidden lg:block md:hidden">
        <input
          type="search"
          id="default-search"
          className="block py-2 w-[400px] px-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Find what you're looking for"
          required
        />
        <div className="absolute top-[35%] left-[90%]">
          <Image src={Search} alt="imag" className="" />
        </div>
      </div>
    </>
  );
}

export default SearchBar;
