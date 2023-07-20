import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import Home from './components/home/hero/Home';
import About from './components/about/About';

function App() {
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
