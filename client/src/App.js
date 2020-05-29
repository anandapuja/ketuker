import React from 'react';
import './App.css';
import './LoginRegister.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {
  Register,
  Login
} from './pages';


function App () {

  if(!localStorage.getItem('token')){
    return (
      <Router>
        <h3>KEtuker Login Register---navbar/logo etc</h3>
        <Switch>
          <Route path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
          <Redirect to={`/login`} />
        </Switch>
      </Router>
    );
  }

  return (
    <>
      <div>Ketuker---navbar/logo etc</div>
    </>
  )
}

export default App;
