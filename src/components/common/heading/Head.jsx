import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useState } from 'react';


export const Head = () => {
    const { user } = useSelector((state) => state.user)
    console.log('redux', user);
    const [scrolled,setScrolled] = useState(false)
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
    
  return (
        <section className={`head fixed w-full top-0 z-10 ${scrolled ? 'hidden' : ''}`}>
            <div className='container flexSB'>
                <div className="logo">
                    <h1>SKILLEX</h1>
                    <span className='text-sm'>ONLINE EDUCATION & LEARNING</span>
                </div>
            <div class=" ml-auto ">
              <div class="w-full  flex border-b-2 border-b-[#1eb2a6]">
                <input type="text" class="bg-transparent h-12   text-[#1eb2a6] focus:text-[#1eb2a6]"/>
                <button type="submit" class="w-10 h-12   text-white ">
                <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
                <div className="social">
                    {/* <i className='fab fa-facebook-f icon'></i>
                    <i className='fab fa-instagram icon'></i>
                    <i className='fab fa-twitter icon'></i> */}
                    {user ? 
                    <Link to='/profile'><i id='ll' className="fas fa-user icon"></i></Link>
                    :
                    <Link to='/auth'><i id='ll' className="fa-solid fa-right-to-bracket icon"></i></Link>
                    }
                </div>
            </div>
        </section>
  )
}
