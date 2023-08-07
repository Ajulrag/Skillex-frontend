import React from "react";
import Title from "../../common/title/Title";
import { homeAbout } from "../../../dummyData";
import AWrapper from "./AWrapper";
import './About.css'


const AboutCard = () => {
    
    return(
        <>
       <section className="aboutHome ">
        <div className="container flexSB gap-5">
            <div className="left row">
                <img src="./images/about.webp" alt="" />
            </div>
            <div className="right row ">
                <Title subtitle='LEARN ANYTHING' title='Benifits About Online Learning Experties' />
                <div className="items flex flex-col gap-4">{homeAbout.map((val, index) => (
                    <div key={val.id} className="item flexSB flex-col gap-3 xl:flex-row">
                        <div className="img m-auto min-w-[5rem]">
                            <img src={val.cover} alt="" />
                        </div>
                        <div className="text">
                            <h2 className="font-bold text-center md:text-left">{val.title}</h2>
                            <p className="text-sm">{val.desc}</p>
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