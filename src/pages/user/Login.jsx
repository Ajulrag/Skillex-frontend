import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import Logo1 from '../../assets/images/login/log.svg'
import Logo2 from '../../assets/images/login/register.svg'
import axios from "axios";
import { loginSchema,signUpSchema } from "../../formSchemas/userAuthSchema"; 
import { useFormik } from "formik";
import toast,{ Toaster } from "react-hot-toast";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';


const Login = () => {
  const [tab, setTab] = useState('');
  const navigate = useNavigate()
  const signupInitials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const signupFormik = useFormik({
    initialValues: signupInitials,
    validationSchema: signUpSchema,

    onSubmit: async (values, action) => {
      try {
        console.log(values);
        const response = await axios.post('/signup', {
          ...values
        },{
          credentials: true
        })
        if(response.status === 201) {
          console.log(response.token,'i am token');
          action.resetForm()
          navigate('/email-verify',{
            state: { email: values.email, name: values.name }
          })
        } else {
          toast.error(response.data.msg)
        }
      } catch (error) {
        console.log(error);
        toast.error('Server Error')
        navigate('/signup')
      }
    }
  })

  const  loginInitials = {
    email:'',
    password:'',
  }

  const loginFormik = useFormik({
    initialValues: loginInitials,
    validationSchema: loginSchema,
    
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(`/login`, {
          ...values
        },{
          credentials: true
        })
        if(response.data.message) {
          localStorage.setItem('userToken', `Bearer ${response.data?.results?.token}`)
          action.resetForm()
          navigate('/')
        } else {
          toast.error(response.data.msg)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.msg)
      }
    }
});

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div id='login' className={`containerH ${tab}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={loginFormik.handleSubmit}  className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input 
                  type="email" 
                  name="email" 
                  onChange={loginFormik.handleChange} 
                  value={loginFormik.values.email} 
                  placeholder="Username" />
              </div>
                  <p className="text-rose-600 text-xs">{loginFormik.errors.email}</p>
              
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  name="password" 
                  onChange={loginFormik.handleChange} 
                  value={loginFormik.values.password} 
                  placeholder="Password" />
              </div>
                  <p className="text-rose-600 text-xs">{loginFormik.errors.password}</p>  
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
            <GoogleOAuthProvider clientId="1065305434408-l2vg8mbjbv5f9a265eaq0ji1ielrhiud.apps.googleusercontent.com  ">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            </GoogleOAuthProvider>
                {/* <a href="/google" className="social-icon">
                  <i className="fab fa-google"></i>
                </a> */}
              </div>
            </form>
            <form onSubmit={signupFormik.handleSubmit} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input 
                type="text" 
                name="name" 
                onChange={signupFormik.handleChange} 
                value={signupFormik.values.name} 
                placeholder="Username" />
              </div>
                <p className="text-rose-600 text-xs">{signupFormik.touched.name && signupFormik.errors.name}</p>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input 
                type="email" 
                name="email" 
                onChange={signupFormik.handleChange} 
                value={signupFormik.values.email} 
                placeholder="Email" />
              </div>
                <p className="text-rose-600 text-xs">{signupFormik.touched.email && signupFormik.errors.email}</p>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" 
                name="password" 
                onChange={signupFormik.handleChange} 
                value={signupFormik.values.password} 
                placeholder="Password" />
              </div>
                <p className="text-rose-600 text-xs">{signupFormik.touched.password && signupFormik.errors.password}</p>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                type="password"
                name="confirmPassword" 
                onChange={signupFormik.handleChange} 
                value={signupFormik.values.confirmPassword} 
                placeholder="Re-enter password" />
              </div>
                <p className="text-rose-600 text-xs">{signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword}</p>
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <GoogleOAuthProvider clientId="1065305434408-l2vg8mbjbv5f9a265eaq0ji1ielrhiud.apps.googleusercontent.com  ">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            </GoogleOAuthProvider>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                For an improved Learning and Teaching Experience!
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={() => setTab('sign-up-mode')}>
                Sign up
              </button>
            </div>
            <img src={Logo1} className="image" alt="cdeve" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Education is the key to a successful Youth
              </p>
              <button className="btn transparent" id="sign-in-btn" onClick={() => setTab('')}>
                Sign in
              </button>
            </div>
              <img src={Logo2} className="image" alt="" />
              
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
