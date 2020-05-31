import React, { useState } from 'react';
import {
  UserProfile,
  UserNavigation,
  UserBarang,
  UserMengajak,
  UserDiajak,
  HeaderMain,
  Navigation
} from '../components';

export default function User () {

  const [navBarang, setNavBarang] = useState(true);
  const [mengajak, setMengajak] = useState(false);
  const [diajak, setDiajak] = useState(false);

  function handleBarang () {
    setNavBarang(true);
    setMengajak(false);
    setDiajak(false);
  }

  function handleMengajak () {
    setNavBarang(false);
    setMengajak(true);
    setDiajak(false);
  }

  function handleDiajak () {
    setNavBarang(false);
    setMengajak(false);
    setDiajak(true);
  }

  return (
    <>
      <HeaderMain />
      <Navigation />
      <div className="user-profile-container">
        <UserProfile />
        <UserNavigation
          barang={handleBarang}
          mengajak={handleMengajak}
          diajak={handleDiajak}
        />
        { navBarang && (
          <div className="user-barang-container">
            <UserBarang />
            <UserBarang />
            <UserBarang />
            <UserBarang />
            <UserBarang />
            <UserBarang />
          </div>
        ) }

        { mengajak && (
          <div className="user-mengajak-container">
            <UserMengajak />
            <UserMengajak />
            <UserMengajak />
            <UserMengajak />
            <UserMengajak />
            <UserMengajak />
          </div>
        ) }

        { diajak && (
          <div className="user-barang-container">
            <UserDiajak />
            <UserDiajak />
            <UserDiajak />
            <UserDiajak />
            <UserDiajak />
            <UserDiajak />
          </div>
        ) }
      </div>
    </>
  );
}