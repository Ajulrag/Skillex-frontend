import React,{ useEffect} from "react"
import Back from "../common/back/Back"
import AboutCard from "./AboutCard"
import axios from "axios"

const About = () => {
    const testServer=async()=>{
        const response= await axios.get(`/getAbout`)
        console.log(response)
    }
    useEffect(() =>{
        console.log('called');
        testServer()
    },[])
    return(
        <>
        <Back title='About Us' />
        <AboutCard />
        </>
    )
}

export default About