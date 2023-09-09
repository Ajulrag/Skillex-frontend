import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../redux/UserSlice";
import UserProfile from "../profile/UserProfile"; 


export const Head = () => {
  let { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false); 
  const dispatch = useDispatch();

  console.log("redux", user);

  const handleIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setProfileOpen(true);
    setDropdownOpen(false); 
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
    localStorage.removeItem("userToken");
    dispatch(setUserDetails(null));
    setDropdownOpen(false);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  return (
    <section className={`head fixed w-full top-0 z-10 ${scrolled ? "hidden" : ""}`}>
      {isProfileOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <UserProfile user={user} onClose={handleCloseProfile} />
        </div>
      )}
      <div className="container flexSB">
        <div className="logo">
          <h1>SKILLEX</h1>
          <span className="text-sm">ONLINE EDUCATION & LEARNING</span>
        </div>
        <div className=" ml-auto ">
          <div className="w-full  flex border-b-2 border-b-[#1eb2a6]">
            <input
              type="text"
              className="bg-transparent h-12   text-[#1eb2a6] focus:text-[#1eb2a6] placeholder:text-black"
              placeholder="Search..."
            />
            <button type="submit" className="w-10 h-12   text-white ">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
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
                        <button
                          onClick={handleProfileClick}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-300 w-full text-left hover:text-[#1eb2a6]"
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-300 w-full text-left hover:text-[#1eb2a6]"
                        >
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
