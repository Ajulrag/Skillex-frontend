import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
//   import { ToastContainer, toast } from 'react-toastify'
import { BsBook, BsClockHistory } from 'react-icons/bs'
import { MdOndemandVideo, MdOutlineComputer } from 'react-icons/md'

const CourseSingleView = () => {
    const { courseId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(courseId);
    }, [courseId]);

    const fetchData = (courseId) => {
        axios
            .get(`/admin/courses/getcourse/${courseId}`)
            .then((res) => {
                const courseData = res.data.results.course;
                console.log(data);
                setData(courseData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching course:", err);
                setError("An error occurred while fetching the course.");
                setLoading(false);
            });
    };

    return (
        <div className='h-full w-full font-poppins relative'>
            {/* <div className="absolute inset-0 bg-black transform rotate-45 "></div> */}
            {/* <ToastContainer position='top-center'></ToastContainer> */}
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : data ? (
                <div>
                    <div className="w-full h-full xl:h-80 xl:bg-lightblue">
                        <div className="w-full h-full xl:py-5  flex flex-col xl:flex-row place-content-start xl:px-14">
                            <div className='w-full xl:w-3/5  h-full flex flex-col gap-5  place-content-start p-5'>
                                <h2 className='text-xl leading-8 lg:text-3xl font-bold '>{data.course_title}</h2>
                                <h2 className='text-lg lg:text-xl font-normal '>{data.course_subtitle}</h2>
                            </div>
                            <div className="xl:shadow-xl bg-white xl:absolute relative xl:right-36 h-auto px-5 xl:py-8 w-full md:px-5 xl:w-96 flex-col flex gap-8 place-items-center">
                                <div className='p-3 rounded-md w-full h-60'>
                                    <video className='w-full h-full' src={process.env.REACT_APP_VID_URL + data.promotional_Video} controls></video>
                                </div>
                                <div className="flex gap-3 place-content-center">
                                    <p className='text-3xl font-semibold text-blue-800'>{'₹ ' + data.saleprice}</p>
                                    <p className='text-3xl font-normal line-through text-gray-600'>{'₹ ' + data.price}</p>
                                </div>
                                <div className="w-full px-3 flex place-content-center">
                                    <button className=' text-white px-5 py-3 w-full bg-secondary' >Add To Cart</button>
                                </div>
                                <div className="w-full px-5 xl:px-3 flex flex-col gap-3">
                                    <h2 className='text-xl font-semibold '>This course includes</h2>
                                    <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><BsBook size={20} className='text-green-500'></BsBook> Language - English</li>
                                    <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><MdOutlineComputer size={20} className='text-green-500'></MdOutlineComputer>Use on desktop, mobile, and laptop</li>
                                    <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><BsClockHistory size={20} className='text-green-500'></BsClockHistory>Lifetime Access</li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full'>
                        <div className="w-full xl:w-3/5 px-2 xl:px-5 py-4 xl:py-10 flex flex-col place-items-center">
                            <Tabs value="overview" className="w-full px-5 xl:px-10">
                                <TabsHeader
                                    className="bg-transparent"
                                    indicatorProps={{
                                        className: "bg-blue-500/10 shadow-none text-blue-500",
                                    }}

                                >

                                    <Tab key="overview" value="overview" className=' font-semibold py-3'>
                                        Overview
                                    </Tab>
                                    <Tab key="curriculum" value="curriculum" className=' font-semibold py-3'>
                                        Curriculum
                                    </Tab>
                                    <Tab key="instructor" value="instructor" className=' font-semibold py-3'>
                                        Instructor
                                    </Tab>
                                    {/* <Tab key="reviews" value="reviews" className=' font-semibold py-3'>
                                        Reviews
                                    </Tab> */}

                                </TabsHeader>
                                <TabsBody>

                                    <TabPanel key="Overview" value="overview">
                                        <div className='flex flex-col gap-3'>
                                            <h1 className='text-xl font-semibold text-black'>Course Description</h1>
                                            <p className='text-gray-700'>{data.description}</p>
                                        </div>
                                    </TabPanel>

                                    <TabPanel key="curriculum" value="curriculum">
                                        <div className="w-full flex flex-col gap-3">
                                            {/* Curriculum content goes here */}
                                        </div>
                                    </TabPanel>
                                    <TabPanel key="instructor" value="instructor">
                                        <div className="w-full bg-gray-100 p-5">
                                            <div className="flex gap-2 place-items-center">
                                                <div className="w-20">
                                                    {/* <img className='w-14 h-14' src={data?.tutor?.profile_image ? details.base_url+course?.tutor?.profile_image : '/tutor_avatar.png'} alt="tutor_profile" /> */}
                                                </div>
                                                <div className="flex flex-col gap-3 place-content-start">
                                                    <h1 className='flex gap-3 font-poppins text-xl font-semibold text-black'>{data?.tutor?.first_name} {data?.tutor?.last_name}</h1>
                                                </div>
                                            </div>
                                            <p className='text-xl text-gray-600 '>{data?.tutor?.description}</p>
                                        </div>
                                    </TabPanel>
                                    <TabPanel key="reviews" value="reviews">
                                        <div className="w-full h-96">
                                            {/* <Reviews courseId={id}/> */}
                                        </div>
                                    </TabPanel>

                                </TabsBody>
                            </Tabs>

                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">No data available.</p>
            )}
        </div>
    );
}

export default CourseSingleView;
