import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../services/schema';

export default function ProductItemList ({ product }) {
  const { loading, error, data: userData } = useQuery(GET_USER, {
    variables:{
      id: product.userId
    }
  });

  if(loading) {
    return <p>Loading ...</p>;
  }

  if(error) {
    console.log(error);
    return <p> error ... </p>;
  }
  
  if(userData) {
    const { getUser: { city } } = userData; 
    return (
      <div className="product-item-list-container">
        <div className="product-item-list-image">
          <img src={product.image} alt="item" />
          <p className="product-item-list-price">IDR {product.price}</p>
        </div>
        <p className="product-item-list-title">{ product.title }</p>
        <p className="product-item-list-location">Loc: {city}</p>
      </div>
    );
  }
}
