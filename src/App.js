import './App.css';
import NavBar from './components/NavBar/NavBar';
import { useLocation, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users';
import User from './components/User/User';
import Ban from './components/Ban/Ban';
import UnBan from './components/UnBan/UnBan';
import Administrators from './components/Administrators/Administrators';
import Error from './components/Error/Error';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/" || !localStorage.getItem("token");

  return (
    <>
      {!hideNav && <NavBar />}

      <div className="App">
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route exact path='/users' element={<ProtectedRoutes><Users /></ProtectedRoutes>} />
          <Route exact path='/user/:userId' element={<ProtectedRoutes><User /></ProtectedRoutes>} />
          <Route exact path='/ban/:userId' element={<ProtectedRoutes><Ban /></ProtectedRoutes>} />
          <Route exact path='/unBan/:userId' element={<ProtectedRoutes><UnBan /></ProtectedRoutes>} />
          <Route exact path='/administrators' element={<ProtectedRoutes><Administrators /></ProtectedRoutes>} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

