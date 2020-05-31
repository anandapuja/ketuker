import React from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation
} from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_CATEGORY } from '../services/schema';
import { useLocation } from 'react-router-dom';

export default function Home () {
  const { search } = useLocation();
  const { loading, error, data } = useQuery(GET_PRODUCT_CATEGORY, { variables: { category: search.slice(10) } });

  if(loading) {
    return <p>Loading</p>;
  }

  if(error) {
    console.log(error);
    return <p>error ... </p>;
  }

  if(data) {
    const { getProducts } = data;
    const { productByCategory } = data;
    console.log(data);
    console.log(getProducts, 'getpro');
    console.log(productByCategory, 'cat');
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
