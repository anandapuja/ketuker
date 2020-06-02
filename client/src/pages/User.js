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
import { GET_TRANSACTION_USER } from '../services/schema';
import { useLocation, useHistory } from 'react-router-dom';

export default function User () {

  const [ navBarang, setNavBarang ] = useState(true);
  const [ mengajak, setMengajak ] = useState(false);
  const [ diajak, setDiajak ] = useState(false);
 // const { loading, error, data } = useQuery(GET_TRANSACTION_USER, { variables: { userId: localStorage.getItem('user_id') }, fetchPolicy: "cache-and-network" });
  const { search, pathname } = useLocation();
  const history = useHistory();
  const [ page, setPage ] = useState(search ? Number(search.slice(6)) : 1);
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    // if(data) {
    //   console.log(data)
    //   if(page !== 1) {
    //     return setProducts(data.productByUser.slice(0, page*9));
    //   } else {
    //     return setProducts(data.productByUser.slice(0, 9));
    //   }
    // }
    const productByUser =  [{
      _id : 1,
      title : 'meja',
      description : "meja tulis",
      userId : 1,
      category : 'household',
      image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
      submit : true,
      price : 80000
     },
     {
      _id : 2,
      title : 'meja',
      description : "meja asik",
      userId : 1,
      category : 'household',
      image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
      submit : true,
      price : 70000
     }]
     setProducts(productByUser)
   }, [])
  // }, [data, page])

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

  // if(loading) {
  //   return <p>Loading</p>;
  // }

  // if(error) {
  //   console.log(error);
  //   return <p>error ... </p>;
  // }

  // if (data) {
  //   const { productByUser } = data;
  //   console.log(productByUser);

  const data = { dataproductByUser :[{
    _id : 1,
    title : 'meja',
    description : "meja tulis",
    userId : 1,
    category : 'household',
    image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
    submit : true,
    price : 80000
   },
   {
    _id : 2,
    title : 'meja',
    description : "meja asik",
    userId : 1,
    category : 'household',
    image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
    submit : true,
    price : 70000
   }]
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
                <UserMengajak product={product.productTarget} key={product._id}/>
              ))}
            </div>
          ) }
  
          { diajak && (
            <div className="user-barang-container">
              {data.transactionByTarget.map(product => (
                <UserDiajak product={product.productTarget} key={product._id} />
              ))}
            </div>
          ) }
        </div>
      </>
    );
  }
// }