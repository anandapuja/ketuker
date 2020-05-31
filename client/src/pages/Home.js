import React from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation,
  CompError,
  CompLoading
} from '../components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_ALL_PRODUCT = gql`
  query getProducts{
    getProducts{
      _id
      title
      description
      userId
      category
      image
      submit
      price
    }
  }
`


export default function Home () {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCT);

  if(loading){
    return <CompLoading />
  }

  if(error){
    return <CompError />
  }

  if(data){
    const { getProducts } = data;
    return (
      <>
      <HeaderMain />
      <Navigation />
      <div className="home-list-container">
        <div className="home-product-list-item-container">
          {
        
            getProducts.map(product => (
              
              <ProductItemList key={ product._id } data={ product } />
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
