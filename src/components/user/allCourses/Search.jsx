import React from "react";

const Search = () => {
  return (
    <>
      <div className="flex items-center justify-between pt-5 pb-10">
        <div className="flex border-b-2 border-b-#1eb2a6 items-center bg-white overflow-hidden">
          <input
            className="border-0 m-0 outline-none h-full"
            type="text"
            placeholder="search"
          />
          <button className="m-0 py-0 px-4 h-full ">SEARCH</button>
        </div>

        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-lg py-2 px-4">
            <option>Categories</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <div>
            <select className="border border-gray-300 rounded-lg py-2 px-4">
              <option>Sort By</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
