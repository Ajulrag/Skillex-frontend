import React, { useState } from 'react'
import { Head } from './Head'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    const [click, setClick] = useState(false)
  return (
    <>
        <Head />
        <header>
            <nav className='flexSB'>
                <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
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
                 <button className="toggle" onClick={() => setClick(!click)}>
                        {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
                 </button>
            </nav>
        </header>

    </>
  )
}

export default Header