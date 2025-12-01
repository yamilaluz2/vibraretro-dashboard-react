import './App.css';
import NavBar from './components/NavBar/NavBar';
import Button from './components/Button/Button';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users';
import User from './components/User/User';
import Administrators from './components/Administrators/Administrators';
import Error from './components/Error/Error';
import Grid from './components/Grid/Grid';

function admin() {
  alert ("Usted no es administrador");
};

function banner() {
  alert ("Usted está baneado");
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        {/*
        <Button text="Boton Admin" callback={admin}></Button>
        <Button text="Boton Bannear" callback={banner}></Button>
        */}
        <Routes>
          <Route exact path='/' element= {<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path='/users' element= {<Users/>} />
          <Route exact path='/user/:userId' element= {<User/>} />
          <Route exact path='/grid' element={<Grid/>} />
          <Route exact path='/administrators' element= {<Administrators/>} />
          <Route path='*' element= {<Error/>} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
