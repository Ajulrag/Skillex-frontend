import React from 'react';
import { useFormik } from 'formik';
import toast,{ Toaster } from "react-hot-toast";
import axios from "../../utils/instance";
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../formSchemas/userAuthSchema';


const AdminLogin = () => {
    const navigate = useNavigate()
    const loginInitials = {
        email:'',
        password:''
    }
    const loginFormik = useFormik({
        initialValues:loginInitials,
        validationSchema:loginSchema,
        onSubmit: async (values, action) => {
            try {
                const response = await axios.post('/admin',{
                    ...values
                },{
                    credentials: true
                })
                if(response.status === 200){
                  console.log(response);
                    localStorage.setItem('adminToken', response.data?.results?.token)
                    action.resetForm()
                    navigate('/admin')
                } else {
                    toast.error(response.data.msg)
                }
            } catch (error) {
                console.log(error);
                toast.error(error.msg)
            }
        }
    })

  return (
    <>
    <Toaster
        position="top-center"
        reverseOrder={false}
    />
    <div className="flex  items-center justify-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={loginFormik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
            />
          </div>
          <p className="text-rose-600 text-xs">{loginFormik.errors.email}</p>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              type="password"
              name="password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
            />
          </div>
          <p className="text-rose-600 text-xs">{loginFormik.errors.password}</p>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 btn text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              type="submit"
            >
              Login
            </button>
            
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AdminLogin;
