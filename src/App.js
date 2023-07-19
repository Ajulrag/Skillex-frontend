import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<UserLayout />} children={[
            <Route path='' element={<h1>hello</h1>}/>
          ]} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
