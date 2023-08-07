import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import Login from './pages/user/Login'
import Home from './pages/user/Home';
import About from './pages/user/About';
import axios from 'axios';
import { BASE_URL } from './config';
import VerifyEmail from './pages/user/VerifyEmail';
import VerificationPage from './pages/user/Email';
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Categories from './pages/admin/categories/categories';
import CourseHome from './pages/user/CourseHome';
import Dashboard from './pages/instructor/home/Dashboard';
import Courses from './pages/admin/courses/Courses';
import Users from './pages/admin/users/Users';
import Instructors from './pages/admin/instructors/Instructors';
import Sales from './pages/admin/sales/Sales';
import Profile from './pages/admin/profile/Profile';
import AdminHome from './pages/admin/home/AdminHome';


function App() {
  axios.defaults.baseURL = BASE_URL
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<UserLayout />} >
            <Route path='' element={<Home />}/>,
            <Route path='/about' element={<About />}/>,
            <Route path='/allCourses' element={<CourseHome />}/>,
          </Route>

          <Route path='/instructor/dashboard' element={<Dashboard />}/>
          <Route path='/verify-email/:token' element={<VerifyEmail />} />
          <Route path='/email-verify'  element={<VerificationPage />} />
          <Route path='/auth' exact element={<Login />} />
          <Route path='/admin-auth' element={<AdminLogin/>}/>
          
          <Route path='/admin' exact element={<AdminLayout/>} >
            <Route path='' element={<AdminHome />}/>,
            <Route path='courses' element={<Courses/>} />,
            <Route path='users' element={<Users/>} />,
            <Route path='instructors' element={<Instructors/>} />,
            <Route path='categories' element={<Categories/>} />,
            <Route path='sales' element={<Sales/>} />,
            <Route path='profile' element={<Profile/>} />,


          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
