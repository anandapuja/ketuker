import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/avatar.png';
import { Link, useHistory } from 'react-router-dom';
import logoutIcon from '../assets/images/logout.png';
import faqIcon from '../assets/images/faq.jpg';
import alertify from 'alertifyjs';
import logoBw from '../assets/images/logo-bw.png';
import logoBwInvert from '../assets/images/logo-bw-invert.png';
import logoutIconRound from '../assets/images/logout.png';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../services/schema';

export default function HeaderMain () {

  const history = useHistory();

  const [ showOut, setShowOut ] = useState(false);
  const [ filter, setFilter] = useState('')
  const { loding, error, data } = useQuery(GET_USER, {variables: {id: localStorage.getItem('user_id')}})

  function ShowSignOut () {
    setShowOut(true);
  }

  function ConfirmSignOut () {
    localStorage.clear();
    alertify.notify('LOGOUT SUCCESS', 'success', 5, function () { console.log('dismissed'); });
    setShowOut(false);
    history.push('/');
  }

  function CancelSignOut () {
    setShowOut(false);
  }

  function ToUploadBarang () {
    if(localStorage.getItem('token')) {
      history.push('/additem');
    } else {
      history.push('/login');
    }
  }

  function search (e) {
    e.preventDefault()
    setFilter('')
    history.push('/?filter=' + filter)
  }

  return (
    <div className="header-container">
      <Link to="/">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className="header-search-container">
        <form onSubmit={search}>
          <input type="text" placeholder="cari barang lalu tekan enter" onChange={(e) => setFilter(e.target.value)} value={filter}/>
        </form>
      </div>
      <div className="header-user-container">
        {localStorage.getItem('token') &&
          <Link to={ localStorage.getItem('token') ? '/additem' : '/login' }>
            <div className="button">
              <a><span>
                Upload Barang
              </span></a>
            </div>
          </Link>
        }
        <Link to={ localStorage.getItem('token') ? '/my-profile' : '/login' }>
          <img src={data ? data.getUser.avatar : avatar} alt="avatar" />
        </Link>
        <Link to="/faq">
          <div style={{ border: 'none', borderRadius: 0, marginLeft: 10, }}>
            <img src={faqIcon} alt="logo" />
          </div>
        </Link>
        <div>
         
          {localStorage.getItem('token') && (
            <div onClick={ShowSignOut}>
              <img style={{ border: 'none', borderRadius: 0, marginLeft: 10, cursor: "pointer" }} src={logoutIconRound} alt="logout" />
            </div>
          )}
          
        </div>
      </div>
      {showOut && (
        <div className="modalSignOut">
          <div className="SignOut-flex">
            <div className="SignOut-title">Sign Out Confirmation</div>
            <div className="SignOut-content">Are you sure to sign out ?</div>
            <div style={{display:"flex", justifyContent: "space-around"}} >
              <button onClick={ConfirmSignOut} className="SignOut-button">CONFIRM</button>
              <button onClick={CancelSignOut} className="SignOut-button">CANCEL</button>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
}