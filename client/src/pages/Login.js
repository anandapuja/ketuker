import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderSecond, NavigationSecond } from '../components';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../services/schema';
import alertify from 'alertifyjs'

function Login () {

  const history = useHistory();
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ notif, setNotif ] = useState('')
  const [ alertInput, setAlertInput ] = useState(false);

  const [ loginUser ] = useMutation(LOGIN_USER);
  
  function ToRegister () {
    history.push('/register');
  }

  function onHandleLogin (e) {
    let str = e.target.value;
      if(str.match(/@/g)) {
        setEmail(str);
      } else {
        setUsername(str);
      }
  }
  
  
  async function SubmitLogin (e) {
    e.preventDefault();
    let data;
    if( password=== '') {
      setNotif ('password is blank');
      setAlertInput(true);
    } else if ( (username ==='') || (email==='')){
      setNotif ('username or email is blank');
      setAlertInput(true);
    } else {
        if(email) {
          data = {
            email: email,
            password: password
          };
          const response = await loginUser({ variables: { input: data } });
          if(response.data.login.token) {
            console.log(response);
            localStorage.setItem('token',response.data.login.token); //dummy token
            localStorage.setItem('user_id',response.data.login._id);
            localStorage.setItem('username',response.data.login.username);
            alertify.notify('SUCCESS LOGIN', 'success', 5, function(){  console.log('dismissed'); });
            history.push('/'); 
          }
        } else {
          data = {
            username: username,
            password: password
          };
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
      {alertInput && (
      <div className="modalAlert">
        <div className="Alert-flex">
          <div className="Alert-title">ALERT</div>
          <div className="Alert-content">Notification: {notif}</div>
          <div >
            <button onClick={()=>setAlertInput(false)} className="Alert-button">OK</button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default Login;


