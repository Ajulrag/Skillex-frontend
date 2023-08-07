import React from "react";
import { awrapper } from "../../../dummyData";

const AWrapper = () => {
    return(
        <>
        <section className="awrapper ">
            <div className=" grid items-center justify-center">
                {awrapper.map((val) => (
                    <div key={val._id} className=" flex items-center justify-center">
                        <div className="img">
                            <img src={val.cover} alt="" />
                        </div>
                        <div className="text">
                            <h1>{val.data}</h1>
                            <h3>{val.title}</h3>

                        </div>
                    </div>
                ))}
            </div>
        </section>
        </>
    )
}

export default AWrapper