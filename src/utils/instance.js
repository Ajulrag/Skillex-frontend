import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// Add an interceptor to set the token in the headers
instance.interceptors.request.use(
  (config) => {
    // Retrieve the token from your application state or storage (e.g., localStorage)
    const userToken = localStorage.getItem("userToken");
    
    // Set the token in the headers if it exists
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
