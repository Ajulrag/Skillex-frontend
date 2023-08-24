import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminPrivateRoutes = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin-auth')
        }
    }, [location, navigate])
    return children;
}

export default AdminPrivateRoutes;