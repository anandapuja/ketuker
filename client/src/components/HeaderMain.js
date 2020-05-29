import React from 'react';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/avatar.png';
import { Link } from 'react-router-dom';

export default function HeaderMain () {
  return (
    <div className="header-container">
      <Link to="/">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className="header-search-container">
        <input type="text" placeholder="cari barang" />
      </div>
      <div className="header-user-container">
        <button>Upload Barang</button>
        <img src={avatar} alt="avatar" />
      </div>
    </div>
  );
}