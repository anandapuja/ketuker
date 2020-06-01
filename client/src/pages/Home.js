import React from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation,
  CompError,
  CompLoading
} from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS_AND_USERS } from '../services/schema';
import { useLocation } from 'react-router-dom';

export default function Home () {
  const { search } = useLocation();
  const { loading, error, data } = useQuery(GET_PRODUCTS_AND_USERS, { variables: { category: search ? search.slice(10) : '' }, fetchPolicy: 'cache-and-network' });

  if(loading){
    return <CompLoading />
  }

  if(error){
    return <CompError />
  }

  if(data) {
    const { getProducts } = data;
    const { productByCategory } = data;
    return (
      <>
        <HeaderMain />
        <Navigation />
        <div className="home-list-container">
          <div className="home-product-list-item-container">
            {
              getProducts ?
                getProducts.map(product => (
                  <ProductItemList key={ product._id } product={ product } />
                )) :
                productByCategory.map(product => (
                  <ProductItemList key={ product._id } product={ product } />
                ))
            }
          </div>
          <div className="home-load-more-container">
            <LoadMoreButton />
          </div>
        </div>
      </>
    );
  }
}
