import React from 'react'
import { Link } from 'react-router-dom'

export const Head = () => {
  return (
        <section className='head'>
            <div className='container flexSB'>
                <div className="logo">
                    <h1>SKILLEX</h1>
                    <span>ONLINE EDUCATION & LEARNING</span>
                </div>
                <div className="social">
                    <i className='fab fa-facebook-f icon'></i>
                    <i className='fab fa-instagram icon'></i>
                    <i className='fab fa-twitter icon'></i>
                    
                    <Link to='/auth'><i id='ll' className="fa-solid fa-right-to-bracket"></i></Link>
                </div>
            </div>
        </section>
  )
}
