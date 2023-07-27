import React,{ useEffect} from "react"
import Back from "../../components/common/back/Back"
import AboutCard from "../../components/about/AboutCard"
import axios from "axios"

const About = () => {
    const testServer=async()=>{
        const response= await axios.get(`/admin/users`)
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