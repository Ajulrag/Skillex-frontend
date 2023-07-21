import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import Home from './components/home/hero/Home';
import About from './components/about/About';
import axios from 'axios';
import { BASE_URL } from './config';


function App() {
  axios.defaults.baseURL = BASE_URL
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<UserLayout />} children={[
            <Route path='/' element={<Home />}/>,
            <Route path='/about' element={<About />}/>
          ]} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
