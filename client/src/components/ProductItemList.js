import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../services/schema';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProductItemList ({ product }) {
  // const { loading, error, data: userData } = useQuery(GET_USER, {
  //   variables:{
  //     id: product.userId
  //   }
  // });

  // if(loading) {
  //   return <p>Loading ...</p>;
  // }

  // if(error) {
  //   console.log(error);
  //   return <p> error ... </p>;
  // }
  
  const city = 'jak'

  // if(userData) {
  //   const { getUser: { city } } = userData; 
    return (
      <div className="product-item-list-container">
        <div className="product-item-list-image">
          <img src={product.image} alt="item" />
          <p className="product-item-list-price">IDR {product.price}</p>
        </div>
        <Link to={ '/barang/' + product._id } >
          <p className="product-item-list-title">{ product.title }</p>
        </Link>
        <p className="product-item-list-location">Lokasi: {city}</p>
      </div>
    );
  }
ProductItemList.propTypes = {
  product: PropTypes.object
};