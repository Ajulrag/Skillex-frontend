import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import Login from './pages/user/Login'
import Home from './pages/user/Home';
import About from './pages/user/About';
import axios from 'axios';
import { BASE_URL } from './config';


function App() {
  axios.defaults.baseURL = BASE_URL
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<UserLayout />} children={[
            <Route path='' element={<Home />}/>,
            <Route path='/about' element={<About />}/>,
          ]} />
        </Routes>
        <Routes>

          <Route path='/auth' exact element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
