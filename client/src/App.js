import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  Register,
  Login,
  Home
} from './pages';
import {
  HeaderMain
} from './components';

function App () {
  return (
    <Router>
      <HeaderMain />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/register" component={ Register } />
        <Route path="/login" component={ Login } />
      </Switch>
    </Router>
  );
}

export default App;
