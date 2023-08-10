import React from "react";
import { Link } from "react-router-dom";

const Head = () => {
  return (
    <>
      <div className="flex justify-between bg-[#1eb2a6] p-2">
      <div className="flex items-center justify-center bg-blue-500 text-white h-20 rounded-full font-bold text-2xl shadow-md">
      SKILLEX
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
