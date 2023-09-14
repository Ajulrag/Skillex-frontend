import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});


instance.interceptors.request.use(
  (config) => {
  
    const userToken = localStorage.getItem("userToken");
    
   
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
