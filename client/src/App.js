import React from 'react';
import './App.css';
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

import { storage } from '../src/storage/firebase'

function App () {

  if(!localStorage.getItem('token')){
    return (
      <Router>
        <h3>KEtuker Login Register</h3>
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
      <div>Ketuker</div>
    </>
  )
}

export default App;
