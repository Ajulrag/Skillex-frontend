import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export const Head = () => {
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Step 1
  const [scrolled, setScrolled] = useState(false);

  console.log("redux", user);

  const handleIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    console.log("appeared");
    localStorage.removeItem('userToken');
  }

  return (
    <section
      className={`head fixed w-full top-0 z-10 ${scrolled ? "hidden" : ""}`}
    >
      <div className="container flexSB">
        <div className="logo">
          <h1>SKILLEX</h1>
          <span className="text-sm">ONLINE EDUCATION & LEARNING</span>
        </div>
        <div className=" ml-auto ">
          <div className="w-full  flex border-b-2 border-b-[#1eb2a6]">
            <input
              type="text"
              className="bg-transparent h-12   text-[#1eb2a6] focus:text-[#1eb2a6]"
            />
            <button type="submit" className="w-10 h-12   text-white ">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        {/* <i className='fab fa-facebook-f icon'></i>
                    <i className='fab fa-instagram icon'></i>
                    <i className='fab fa-twitter icon'></i> */}
        <div className="social">
          <div className="social">
            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={handleIconClick}
                >
                  <i id="ll" className="fas fa-user icon"></i>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-50 right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg">
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth">
                <i id="ll" className="fa-solid fa-right-to-bracket icon"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
