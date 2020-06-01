import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  UserNavigation,
  UserBarang,
  UserMengajak,
  UserDiajak,
  HeaderMain,
  Navigation,
  LoadMoreButton
} from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_USER } from '../services/schema';
import { useLocation, useHistory } from 'react-router-dom';

export default function User () {

  const [ navBarang, setNavBarang ] = useState(true);
  const [ mengajak, setMengajak ] = useState(false);
  const [ diajak, setDiajak ] = useState(false);
  const { loading, error, data } = useQuery(GET_PRODUCT_USER, { variables: { userId: localStorage.getItem('user_id') }, fetchPolicy: "cache-and-network" });
  const { search, pathname } = useLocation();
  const history = useHistory();
  const [ page, setPage ] = useState(search ? Number(search.slice(6)) : 1);
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    if(data) {
      if(page !== 1) {
        return setProducts(data.productByUser.slice(0, page*9));
      } else {
        return setProducts(data.productByUser.slice(0, 9));
      }
    }
  }, [data, page])

  function nextPage () {
    setPage((val)=> val+1);
    history.push({
      pathname,
      search: '?page=' + (page + 1)
    })
  }

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
            <>
              <div className="user-barang-container">
                { products.map(product => (
                  <UserBarang product={product} key={product._id}/>
                ))}
              </div>
              <div className="home-load-more-container">
                {
                  products.length < data.productByUser.length && (data.productByUser.length > 9) && 
                  <LoadMoreButton page={nextPage}/>
                }
              </div>
            </>
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