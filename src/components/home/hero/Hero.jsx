import React from "react"
import './Hero.css'
import Title from "../../common/title/Title"

const Hero = () => {
    return(
        <>
        <section className="hero">
            <div className="container">
                <div className="row">
                    <Title subtitle='WELCOME TO SKILLEX' title='Best Online Education Platform'/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sit consectetur laudantium ullam earum! Libero maxime et labore consequatur vel velit, nemo eaque explicabo laudantium facere nesciunt maiores rerum obcaecati?</p>
                    <div className="button">
                        <button className="primary-btn">
                            GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
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