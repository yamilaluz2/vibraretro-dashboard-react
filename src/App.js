import './App.css';
import NavBar from './components/NavBar/NavBar';
import Button from './components/Button/Button';
import { useLocation, BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users';
import User from './components/User/User';
import Administrators from './components/Administrators/Administrators';
import Banned from './components/Banned/Banned';
import Error from './components/Error/Error';

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/";

  return (
    <>
      {!hideNav && <NavBar />}

      <div className="App">
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/user/:userId' element={<User />} />
          <Route exact path='/administrators' element={<Administrators />} />
          <Route exact path='/banned' element={<Banned />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

