import React from "react";
import { Link } from "react-router-dom";

const Head = () => {
  return (
    <>
      <div className="flex justify-between bg-[#2D2F31] p-2 fixed w-full z-50">
          <div>
            <h1 className="text-4xl font-bold text-blue-500   hover:scale-110 transition duration-300">
              S<span className="text-red-500">K</span>
              <span className="text-yellow-500">I</span>
              <span className="text-green-500">L</span>
              <span className="text-blue-500">L</span>
              <span className="text-indigo-500">E</span>
              <span className="text-purple-500">X</span>
            </h1>
          </div>
        

        <div className="flex items-center space-x-4">
          <h1>Ajulrag.B</h1>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
              className="h-10 w-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
