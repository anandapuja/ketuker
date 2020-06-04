import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  UserNavigation,
  UserBarang,
  UserMengajak,
  UserDiajak,
  HeaderMain,
  Navigation,
  LoadMoreButton,
  CompError,
  CompLoading
} from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_TRANSACTION_USER } from '../services/schema';
import { useLocation, useHistory, Link } from 'react-router-dom';

export default function User () {

  const [ navBarang, setNavBarang ] = useState(true);
  const [ mengajak, setMengajak ] = useState(false);
  const [ diajak, setDiajak ] = useState(false);
  const { loading, error, data } = useQuery(GET_TRANSACTION_USER, { variables: { userId: localStorage.getItem('user_id') }, fetchPolicy: 'cache-and-network' });
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
  }, [ data, page ]);

  function nextPage () {
    setPage((val)=> val+1);
    history.push({
      pathname,
      search: '?page=' + (page + 1)
    });
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

  function setUserId (product, type) {
    if (type === 'diajak') {
      localStorage.setItem('userOriginal', product.userOriginal);
      localStorage.setItem('userTarget', product.userTarget);
    } else {
      localStorage.setItem('userOriginal', product.userTarget);
      localStorage.setItem('userTarget', product.userOriginal);
    }
  }

  if(loading) {
    return <CompLoading></CompLoading>;
  }

  if(error) {
    if(!localStorage.getItem('user_id')) {
      history.push('/')
    }
    return <CompError></CompError>;
  }

  if (data) {
    const { productByUser } = data;
    return (
      <>
        <HeaderMain />
        {/* <Navigation /> */}
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
              {data.transactionByOriginal.map(product => (
                <Link to={'/konfirmasi/' + product._id} onClick={setUserId(product, 'mengajak')} key={product._id}>
                  <UserMengajak product={product.productTarget} status={product.status}/>
                </Link>
              ))}
            </div>
          ) }
  
          { diajak && (
            <div className="aneh user-barang-container">
              <div className="gatauApa">

              {data.transactionByTarget.map(product => (
                <Link to={'/konfirmasi/' + product._id + '?diajak'} onClick={setUserId(product, 'diajak')} key={product._id}>
                <UserDiajak product={product.productTarget} status={product.status}/>
                </Link>
                ))}
              </div>
            </div>
          ) }
        </div>
      </>
    );
  }
}