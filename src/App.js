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
            <Route path='/instructor' element={<Dashboard />}/>,
          </Route>
          
          <Route path='/verify-email/:token' element={<VerifyEmail />} />
          <Route path='/email-verify'  element={<VerificationPage />} />
          <Route path='/auth' exact element={<Login />} />
          <Route path='/admin-auth' element={<AdminLogin/>}/>
          
          <Route path='/admin' exact element={<AdminLayout/>} >
            <Route path='categories' element={<Categories/>} />
          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
