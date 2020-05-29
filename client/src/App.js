import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  Register,
  Login
} from './pages';

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={ Register } />
        <Route path="/login" component={ Login } />
      </Switch>
    </Router>
  );
}

export default App;
