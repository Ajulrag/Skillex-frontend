import React from "react"
import './Hero.css'
import Title from "../../common/title/Title"
import { Link } from "react-router-dom"

const Hero = () => {
    return(
        <>
        <section className="hero pb-6">
            <div className="container">
                <div className="row">
                    <Title subtitle='WELCOME TO SKILLEX' title='Best Online Education Platform'/>
                    <p>What makes a child gifted and talented may not always be good grades in school, but a different way of looking at the world and learning.</p>
                    <div className="button my-4">
                        
                       <button className="bg-primary text-white rounded-md font-bold p-3 me-5"><Link to='/auth'>
                            GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>   </Link>
                        </button>
                     
                        <button className="bg-white text-primary rounded-md font-bold p-3">
                            VIEW COURSES <i className="fa fa-long-arrow-alt-right"></i>
                        </button>  
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Hero