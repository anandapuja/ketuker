import React, { useState, useEffect } from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation,
  CompError,
  CompLoading
} from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_PRODUCT } from '../services/schema';
import { useLocation, useHistory } from 'react-router-dom';
import SliderApp from '../components/Slider';

export default function Home () {
  const { search } = useLocation();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_ALL_PRODUCT, { fetchPolicy: 'cache-and-network' });
  const [ page, setPage ] = useState(search ? Number(search.slice(6)) : 1);
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    if(data) {
      const notMine = data.getProducts.filter((el) => el.userId != localStorage.getItem('user_id'))
      if(page !== 1) {
        return setProducts(notMine.slice(0, page*9));
      } else {
        return setProducts(notMine.slice(0, 9));
      }
    }
  }, [ data, page ]);

  function nextPage () {
    setPage((val)=> val+1);
    history.push('/?page=' + (page + 1));
  }

  if(loading){
    return <CompLoading />
  }

  if(error){
    return <CompError />
  }

  if(data) {
    return (
      <>
        <HeaderMain />
        <Navigation />
        <SliderApp />
        <div className="home-list-container">
          <div className="home-product-list-item-container">
            {
              products.map(product => (
                <ProductItemList key={ product._id } product={ product } />
              )) 
            }
          </div>
          <div className="home-load-more-container">
            {
              products.length < data.getProducts.length && (data.getProducts.length > 9) && 
              <LoadMoreButton page={nextPage}/>
            }
          </div>
        </div>
      </>
    );
  }
}
