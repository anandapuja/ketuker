import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderMain, Navigation } from '../components';

export default function Success () {
  return (
    <>
      <HeaderMain />
      <Navigation />
      <div className="success-container">
        <div className="success-message">
          <h1>SUCCESS</h1>
          <p>Anda telah mengirimkan permintaan barter. Silahkan cek status permintaan barter Anda di halaman user di <Link to="/my-profile">sini!</Link></p>
          <Link to="/">
            <button>Back To Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}
