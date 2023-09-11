import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/instance";
import { toast, Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const VerifyEmail = async () => {
      try {
        const response = await axios.post("/verify-email", { token });
        toast.success("Email verified succesfully.Please login...");
        console.log(response.data);
      } catch (error) {
        toast.error("Verification failed");
        console.log(error);
      }
      navigate("/auth");
    };
    VerifyEmail();
  }, [navigate, token]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <p>Email verification in progress....</p>
    </>
  );
};

export default VerifyEmail;
