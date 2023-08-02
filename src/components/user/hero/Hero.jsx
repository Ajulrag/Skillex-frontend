import React from "react"
import './Hero.css'
import Title from "../../common/title/Title"
import { Link } from "react-router-dom"

const Hero = () => {
    return(
        <>
        <section className="hero">
            <div className="container">
                <div className="row">
                    <Title subtitle='WELCOME TO SKILLEX' title='Best Online Education Platform'/>
                    <p>What makes a child gifted and talented may not always be good grades in school, but a different way of looking at the world and learning.</p>
                    <div className="button">
                        
                       <button className="primary-btn"><Link to='/auth'>
                            GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>   </Link>
                        </button>
                     
                        <button >
                            VIEW COURSES <i className="fa fa-long-arrow-alt-right"></i>
                        </button>  
                    </div>
                </div>
            </div>
        </section>
        <div className="margin"></div>
        </>
    )
}

export default Hero