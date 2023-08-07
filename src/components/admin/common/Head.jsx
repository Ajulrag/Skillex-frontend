import React from "react";
import { Link } from "react-router-dom";

const Head = () => {
  return (
    <>
      <div className="flex justify-between bg-[#1eb2a6] p-2">
        <div className="flex border-b-2 border-b-#1eb2a6 items-center overflow-hidden">
          <input
            className="border-0 m-0 outline-none h-full bg-transparent placeholder:text-white"
            type="text"
            placeholder="search"

          />
          <button className=" "><i class="fa-solid fa-magnifying-glass text-white"></i></button>
        </div>

        <div className="flex items-center space-x-4">
          <h1>Ajulrag.B</h1>
          <div>
           <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" className="h-10 w-10"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
