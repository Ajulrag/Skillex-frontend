import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect (() => {

       const token = localStorage.getItem('userToken')
       if (!token) {
        navigate('/auth')
       }

    },[location, navigate] ) 

    return children;
}

export default PrivateRoutes