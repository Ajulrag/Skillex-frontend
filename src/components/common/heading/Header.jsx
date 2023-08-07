import React, { useState } from 'react';
import { Head } from './Head';
import './Header.css';
import { Link } from 'react-router-dom';
import BecomeInstructor from '../../instructor/becomeInstructor/BecomeInstructor';
import { useEffect } from 'react';
import { useSelector } from "react-redux";


const Header = () => {
  const { user } = useSelector((state) => state.user)
  const [click, setClick] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleLinkClick = (event) => {
    event.preventDefault();
    setShowInstructor(true);
  };

  const handleCloseInstructor = () => {
    setShowInstructor(false);
  };

  const handleSubmitInstructor = (event) => {
    event.preventDefault();
    setShowInstructor(false);
  };

  return (
    <>
      <Head />

      <header className={`fixed w-full transition z-10 ${scrolled ? 'header-scrolled top-0' : 'top-24'}`}>
        <nav className={`flexSB ali nav-section ${!scrolled && 'bg-[#ffffff33] '}`}>
          <ul className={click ? 'mobile-nav' : 'flexSB items-center'} onClick={() => setClick(false)}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/allCourses'>Courses</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/Team'>Team</Link></li>
            <li><Link to='/pricing'>Pricing</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>

            {/* Use conditional rendering to show "Become Instructor" or "Dashboard" */}
            {user && user.isInstructor ? (
              <li><Link to='/instructor/dashboard'>Dashboard</Link></li>
            ) : (
              <li><Link to='/becomeInstructor' onClick={handleLinkClick}>Become Instructor</Link></li>
            )}

            {showInstructor && (
              <BecomeInstructor onClose={handleCloseInstructor} onSubmit={handleSubmitInstructor} />
            )}

          </ul>
          <div className="start flex items-center">
            <div className="button text-center py-5 min-w-[12rem] hidden md:block font-bold">GET STARTED</div>
            <button className="md:hidden btn" onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
          </div>
          
        </nav>
      </header>
    </>
  )
}

export default Header;
