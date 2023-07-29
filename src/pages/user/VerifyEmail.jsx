import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const VerifyEmail = () => {
    const navigate = useNavigate()
    const { token } = useParams()
    const customToastStyle = {
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: '#ffff',
        color: '#fff',
      };
      
      const customToastOptions = {
        duration: 8000, // Duration in milliseconds
        position: 'top-right', // Toast position on the screen
        style: customToastStyle, // Custom styles for the toast
      };
      
        useEffect (()=> {
             const VerifyEmail = async () => {
                try {
                    const response = await axios.post('/verify-email', { token })
                    toast.success('Email verified succesfully.Please login...',customToastOptions)
                    console.log(response.data);
                } catch (error) {
                    toast.error('Verification failed',customToastOptions)
                    console.log(error);
                }
                navigate('/auth')
             }
             VerifyEmail();

        },[token])

    return(
        <>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        <p>Email verification in progress....</p>
        </>
    )
}

export default VerifyEmail;