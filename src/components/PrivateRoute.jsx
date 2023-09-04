import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserDetails } from "../redux/UserSlice";
import { useDispatch } from "react-redux";



const PrivateRoutes = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('userToken');

        if (!token) {
            navigate('/auth');
        } else {
            // console.log(token, "token");
            const fetchProfile = async () => {
                try {
                    const response = await axios.get('/getprofile', {
                        headers: {
                            'autherization': `${token}`
                        },
                        // withCredentials: true
                    });
                    // console.log(response , "priba");
                    const userDetails = response.data.user;
                    dispatch(setUserDetails(userDetails));

                    if (userDetails.status === 'Inactive') {
                        localStorage.removeItem('userToken');
                        navigate('/auth');
                    }

                } catch (err) {
                    console.log(err);
                }
            }

            fetchProfile();
        }
    }, [location, navigate, dispatch]);


    return children;
}

export default PrivateRoutes