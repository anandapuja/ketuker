import React, { useState } from 'react';
import {useHistory} from "react-router-dom";

function Login(){

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
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
  }

  return (
    <div>
      <h3>Page Login</h3>
      <form onSubmit={SubmitLogin}>
          <label>Username/ Email</label>
          <input onChange={onHandleLogin} type='text' placeholder='input your registered  username/email'></input>
          <label>Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} type="password"></input>
          <button>Login</button>
        </form>

      <button onClick={ToRegister}>Sign Up</button>
    </div>
  )

}

export default Login



// import React from 'react';

// export default function Login () {
//   return (
//     <>
//       <h3>Login</h3>

//     </>
//   );
// }
