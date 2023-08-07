import React from "react";
import { coursesCard } from "../../../dummyData";
import "./courses.css";
import Search from "./Search";

const CourseCard = () => {
  return (
    <>
    <Search />
      <section className="coursesCard">
        <div className="container grid2">
          {coursesCard.map((val) => {
            console.log(val);
            return (
              <div className="items">
                <div className="content flex">
                  <div className="left p-6">
                    <div className="img">
                      <img src={val.cover} alt="" />
                    </div>
                  </div>
                  <div className="text">
                    <h1>{val.coursesName}</h1>
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <label htmlFor="">(5.0)</label>
                    </div>
                    <div className="details">
                      {val.courTeacher.map((details) => (
                        <>
                          <div className="box">
                            <div className="dimg">
                              <img src={details.dcover} alt="" />
                            </div>
                            <div className="para">
                              <h4>{details.name}</h4>
                            </div>
                          </div>
                          <span>{details.totalTime}</span>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="price">
                 <h3>{val.priceAll} / {val.pricePer}</h3> 
                </div>
                <div className="px-10 pb-5">
                <button className="outline-btn h-14 ">ENROLL NOW!</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CourseCard;
