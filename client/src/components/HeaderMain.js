import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/avatar.png';
import { Link, useHistory } from 'react-router-dom';
import logoutIcon from '../assets/images/logout.png';
import alertify from 'alertifyjs'

export default function HeaderMain () {

  const history = useHistory();

  const [showOut, setShowOut] = useState(false)

  function ShowSignOut(){
    setShowOut(true)
  }

  function ConfirmSignOut(){
    localStorage.clear()
    alertify.notify('LOGOUT SUCCESS', 'success', 5, function(){  console.log('dismissed'); });
    history.push('/')
  }

  function CancelSignOut(){
    setShowOut(false)
  }

  function ToUploadBarang () {
    if(localStorage.getItem('token')){
      history.push('/additem');
    } else {
      history.push('/login')
    }
     
  }

  return (
    <div className="header-container">
      <Link to="/">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className="header-search-container">
        <input type="text" placeholder="cari barang lalu tekan enter" />
      </div>
      <div className="header-user-container">
        <button onClick={ToUploadBarang}>Upload Barang</button>
        <Link to={ localStorage.getItem('token') ? '/my-profile' : '/login' }>
          <img src={avatar} alt="avatar" />
        </Link>
        <div>
          <div onClick={ShowSignOut}>
            <img style={{border: "none", borderRadius: 0, marginLeft: 10,}} src={logoutIcon} alt="logout" />
          </div>
        </div>
      </div>
      {showOut && (
       <div className="modalSignOut">
         <div className="SignOut-flex">
            <div className="SignOut-title">Sign Out Confirmation</div>
            <div className="SignOut-content">Are you sure to sign out ?</div>
            <div >
              <button onClick={ConfirmSignOut} className="SignOut-button">CONFIRM</button>
              <button onClick={CancelSignOut} className="SignOut-button">CANCEL</button>
            </div>
        </div>
       </div>
      )}
     
    </div>
  );
}