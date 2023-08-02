import React,{useEffect} from "react"
import Hero from "../../components/user/hero/Hero"
import AboutCard from "../../components/user/about/AboutCard"
import axios from "axios"

const Home = () => {
    const testServer=async()=>{
        const response= await axios.get(`/`)
        console.log(response)
    }
    useEffect(() =>{
        console.log('called');
        testServer()
    },[])
    return(
        <>
        <Hero />
        <AboutCard/>
        </>
    )
}

export default Home