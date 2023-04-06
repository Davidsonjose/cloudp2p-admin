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
          className="block py-2 w-[400px] px-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-300 focus:border-gray-300 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-gray-100 dark:focus:border-gray-100"
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
