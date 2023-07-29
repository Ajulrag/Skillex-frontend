import React from "react";
import Title from "../common/title/Title";
import { homeAbout } from "../../dummyData";
import AWrapper from "./AWrapper";
import './About.css'

const AboutCard = () => {
    return(
        <>
       <section className="aboutHome">
        <div className="container flexSB">
            <div className="left row">
                <img src="./images/about.webp" alt="" />
            </div>
            <div className="right row">
                <Title subtitle='LEARN ANYTHING' title='Benifits About Online Learning Experties' />
                <div className="items">{homeAbout.map((val, index) => (
                    <div key={val.id} className="item flexSB">
                        <div className="img">
                            <img src={val.cover} alt="" />
                        </div>
                        <div className="text">
                            <h2>{val.title}</h2>
                            <p>{val.desc}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
       </section>
       <AWrapper />
        </>
    )
}

export default AboutCard