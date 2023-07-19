import React from 'react'
import { Head } from './Head'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <Head />
        <header>
            <nav className='flexSB'>
                <ul className='flexSB'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/allCourses'>Courses</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/Team'>Team</Link></li>
                    <li><Link to='/pricing'>Pricing</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                    <li><Link to='/becomeInstructor'>Become Instructor</Link></li>
                </ul>
                <div className="start">
                    <div className="button">GET STARTED</div>
                </div>
            </nav>
        </header>

    </>
  )
}

export default Header