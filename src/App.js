import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import Home from './components/home/hero/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<UserLayout />} children={[
            <Route path='/' element={<Home />}/>
          ]} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
