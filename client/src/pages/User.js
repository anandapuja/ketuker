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
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_USER } from '../services/schema';

export default function User () {

  const [ navBarang, setNavBarang ] = useState(true);
  const [ mengajak, setMengajak ] = useState(false);
  const [ diajak, setDiajak ] = useState(false);
  const { loading, error, data } = useQuery(GET_PRODUCT_USER, { variables: { userId: localStorage.getItem('user_id') } });

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

  if(loading) {
    return <p>Loading</p>;
  }

  if(error) {
    console.log(error);
    return <p>error ... </p>;
  }

  if (data) {
    const { productByUser } = data;
    console.log(productByUser);
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
              { productByUser.map(product => (
                <UserBarang product={product} key={product._id}/>
              ))}
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
}