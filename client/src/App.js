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
  Home,
  Category
} from './pages';
import {
  HeaderMain,
  Navigation
} from './components';

function App () {
  return (
    <Router>
      <HeaderMain />
      <Navigation />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/register" component={ Register } />
        <Route path="/login" component={ Login } />
        <Route path="/category" component={ Category } />
      </Switch>
    </Router>
  );
}

export default App;
