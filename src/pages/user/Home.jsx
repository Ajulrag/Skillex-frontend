import React,{useEffect,} from "react"
import Hero from "../../components/user/hero/Hero"
import AboutCard from "../../components/user/about/AboutCard"
import axios from "axios"
import { setUserDetails} from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect (() => {

        const token = localStorage.getItem('userToken')
        if (token) {
         const fetchProfile = async () => {
             try {
                 const response = await axios.get('/getprofile', {
                     headers: {
                         'autherization':`${localStorage.getItem('userToken')}`
                     }
                 },
                     {
                         credentials: true
                     }
                 )
                 console.log("hello",response.data.user);
                 dispatch(setUserDetails(response.data.user))
     
             } catch (err) {
                 console.log(err);
             }
         }
 
             fetchProfile()
        }
 
     },[dispatch, navigate] ) 
    return(
        <>
        <Hero />
        <AboutCard/>
        </>
    )
}

export default Home