import React, { useState } from 'react';
import {useHistory} from "react-router-dom";

// import gql from "graphql-tag";
// import {useQuery, useMutation} from '@apollo/react-hooks'

//waiting server
// const SIGNIN = gql`
//     mutation 
    
// `


function Login(){

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const [signin] = useMutation(SIGNIN)
  
  function ToRegister(){
    history.push('/register')
  }

  function onHandleLogin(e){
    console.log(e.target.value,"-----")
    let str = e.target.value
    console.log(str, "---target value")
    if(str.match(/@/g)){
      console.log(str,"====email")
      setEmail(str)
    } else {
      console.log(str,"===username")
      setUsername(str)
    }
  }
  
  function SubmitLogin(e){
    e.preventDefault();
    console.log('submitLogin')
    console.log(username, "username / email", email)
    let data
    if(email){
      data= {
        email: email,
        password: password
      }
    } else {
      data= {
        username: username,
        password: password
      }
    }
    console.log(data, "---data")
    // signin({variables: })
    localStorage.setItem('token','1234') //dummy token
    history.push('/')
  }

  return (
    <div className="login">
      <h3 className="title-login">SIGN IN</h3>
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
          <button className="btn-login">SIGN IN</button>
        </form>
      </div>
      
      <div className="footer-login">Not have an account ? Sign Up
                                    <a href="#" onClick={ToRegister}> here</a>
                                    </div>
    </div>
  )

}

export default Login


