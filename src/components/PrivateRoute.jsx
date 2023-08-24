import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserDetails } from "../redux/UserSlice";


const PrivateRoutes = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const token = localStorage.getItem('userToken')
        if (!token) {
            navigate('/auth')
        } else {
            const fetchProfile = async () => {
                try {
                    const response = await axios.get('/getprofile', {
                        headers: {
                            'autherization': `Bearer ${localStorage.getItem('userToken')}`
                        }
                    },
                        {
                            credentials: true
                        }
                    )
                    console.log("hello", response.data.user);
                    dispatchEvent(setUserDetails(response.data.user))

                } catch (err) {
                    console.log(err);
                }
            }

            fetchProfile()
        }

    }, [location, navigate])

    return children;
}

export default PrivateRoutes