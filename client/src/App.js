import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './services/graphql';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {
  Register,
  Login,
  Home,
  Category,
  AddItem,
  DetailItemUser,
  DetailItemCustomer,
  User
} from './pages';
import {
  HeaderMain,
  Navigation,
  HeaderSecond,
} from './components';
import Confirmation from './pages/Confirmation';


function App () {
  return (
    <ApolloProvider client={ client }>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
          <Route path="/category" component={ Category } />
          <Route path="/additem" component={ AddItem} />
          <Route path="/category" component={ Category } />
          <Route path="/me/barang/:id" component={ DetailItemUser } />
          <Route path="/barang/:id" component={ DetailItemCustomer } />
          <Route path="/my-profile" component={ User } />
          <Route path="/konfirmasi" component={ Confirmation } />
        </Switch>
      </Router>
    </ApolloProvider>
  );
} 

export default App;
