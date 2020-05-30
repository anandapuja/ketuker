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
  Login,
  Home,
  Category,
  AddItem
} from './pages';
import {
  HeaderMain,
  Navigation
} from './components';


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
    <Router>
      <HeaderMain />
      <Navigation />
      <Switch>
        <Route exact path="/" component={ Home } />
        {/* <Route path="/register" component={ Register } />
        <Route path="/login" component={ Login } /> */}
        <Route path="/category" component={ Category } />
        <Route path="/additem" component={ AddItem} />
      </Switch>
    </Router>
  );
}

export default App;
