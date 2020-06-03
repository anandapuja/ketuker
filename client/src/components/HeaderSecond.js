import React from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import logoBwInvert from '../assets/images/logo-bw-invert.png';

export default function HeaderSecond () {
  return (
    <div className="header-second-container">
      {/* <div className="arrow-header-left"></div> */}
      <Link to="/">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
      </Link>
    </div>
  );
}