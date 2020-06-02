import React, { useState } from 'react';
import PropTypes from 'prop-types';

import checkState from '../assets/images/check.png'


export default function DetailItemCustomerList ({ ready, product }) {
  const [ status, setStatus ] = useState(false);
  function checked () {
    let data = {
      _id: product._id,
      title: product.title,
      description: product.description,
      userId: product.userId,
      category: product.category,
      image: product.image,
      submit: true,
      price: product.price,
      whislist: product.whislist
    };
    setStatus(val => !val);
    ready(data);
  }
  return (
    <div className="product-item-list-container">
      <div className="product-item-list-image">
        <img src={product.image} alt="item" />
        <p className="product-item-list-price">IDR {product.price},-</p>
      </div>
      <p className="product-item-list-title">{product.title}</p>
      {
        status && (
          <div style={{textAlign: "center"}}>
            <img className="check-state" src={checkState} alt="check" />
            <button onClick={checked}>Uncheck</button>
          </div>
        )
      }
      {
        !status && (
          <div style={{textAlign: "center"}}>
            <button onClick={checked}>Check</button>
          </div>
        )
      }
    </div>
  );
}

DetailItemCustomerList.propTypes = {
  ready: PropTypes.func,
  product: PropTypes.object
};