import Header from "../common/heading/Header"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
    return(
        <>
            <Header />
            <Outlet/>
        </>
        

  )

}

export default UserLayout