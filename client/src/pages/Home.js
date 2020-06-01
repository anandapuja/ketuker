import React, { useState, useEffect } from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation
} from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS_AND_USERS } from '../services/schema';
import { useLocation, useHistory } from 'react-router-dom';
import SliderApp from '../components/Slider';

export default function Home () {
  const { search } = useLocation();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_PRODUCTS_AND_USERS, { variables: { category: search ? search.slice(10) : '' }, fetchPolicy: 'cache-and-network' });
  const [ page, setPage ] = useState(1);
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    if(data) {
      if(page !== 1) {
        return setProducts(data.productByCategory.slice(0, page*9));
      } else {
        return setProducts(data.productByCategory.slice(0, 9));
      }
    }
  }, [data, page])

  function nextPage () {
    setPage((val)=> val+1);
    history.push('/?page=' + (page + 1))
  }

  if(loading) {
    return <p>Loading</p>;
  }

  if(error) {
    console.log(error);
    return <p>error ... </p>;
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
              products.length < data.productByCategory.length &&
              <LoadMoreButton page={nextPage}/>
            }
          </div>
        </div>
      </>
    );
  }
}
