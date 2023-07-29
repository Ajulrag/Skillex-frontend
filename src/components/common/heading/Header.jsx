import React, { useState } from 'react';
import { Head } from './Head';
import './Header.css';
import { Link } from 'react-router-dom';
import BecomeInstructor from '../../user/BecomeInstructor';

const Header = () => {
  const [click, setClick] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false); // Add state variable to track instructor status

  const handleLinkClick = (event) => {
    event.preventDefault();
    setShowInstructor(true);
  };

  const handleCloseInstructor = () => {
    setShowInstructor(false);
  };

  const handleSubmitInstructor = (data) => {
    console.log(data);
    // Set the instructor status to true when the instructor signs up successfully
    setIsInstructor(true);
  };

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB ali'>
          <ul className={click ? 'mobile-nav' : 'flexSB'} onClick={() => setClick(false)}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/allCourses'>Courses</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/Team'>Team</Link></li>
            <li><Link to='/pricing'>Pricing</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>

            {/* Use conditional rendering to show "Become Instructor" or "Dashboard" */}
            {isInstructor ? (
              <li><Link to='/dashboard'>Dashboard</Link></li>
            ) : (
              <li><Link to='/becomeInstructor' onClick={handleLinkClick}>Become Instructor</Link></li>
            )}

            {showInstructor && (
              <BecomeInstructor onClose={handleCloseInstructor} onSubmit={handleSubmitInstructor} />
            )}

          </ul>
          <div className="start">
            <div className="button">GET STARTED</div>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header;
