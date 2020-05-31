import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import { HeaderSecond, NavigationSecond } from '../components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const LOGIN_USER = gql`
  mutation loginUser($input: UserLogin) {
    login(input: $input) {
      token
      username
      _id
    }
  }
`


function Login(){

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginUser] = useMutation(LOGIN_USER);
  
  function ToRegister(){
    history.push('/register')
  }

  function onHandleLogin(e){
    let str = e.target.value
    if(str.match(/@/g)){
      setEmail(str)
    } else {
      setUsername(str)
    }
  }
  
  async function SubmitLogin(e){
    e.preventDefault();
    let data
    if(email){
      data = {
        email: email,
        password: password
      }
      const response = await loginUser({ variables: { input: data} });
      if(response.data.login.token){
        console.log(response)
        localStorage.setItem('token',response.data.login.token); //dummy token
        localStorage.setItem('user_id',response.data.login._id);
        localStorage.setItem('username',response.data.login.username);
        history.push('/')
      }
    } else {
      data = {
        username: username,
        password: password
      }
    }
  }

  return (
    <>
      <HeaderSecond />
      <NavigationSecond />
      <div className="register">
        <h3 className="title-register">SIGN IN</h3>
        <div className="div-form">
          <form onSubmit={SubmitLogin} className="form-login">
            <input onChange={onHandleLogin} 
              type='text' 
              placeholder='username/email'
              className="input-login"
              ></input>
            <input onChange={(e)=>setPassword(e.target.value)} 
              type="password"
              placeholder='password'
              className="input-login"
              ></input>
            <button className="btn-register">SIGN IN</button>
          </form>
        </div>
        
        <div className="footer-login">Not have an account ? Sign Up
          <a href="#" onClick={ToRegister}> here</a>
        </div>
      </div>
    </>
  );
}

export default Login


