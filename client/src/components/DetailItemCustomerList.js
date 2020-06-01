/* eslint-disable react/prop-types */
import React from 'react';

export default function DetailItemCustomerList ({ ready, product }) {
  return (
    <div className="product-item-list-container">
      <div className="product-item-list-image">
        <img src={product.image} alt="item" />
        <p className="product-item-list-price">IDR {product.price},-</p>
      </div>
      <p className="product-item-list-title">{product.title}</p>
      <button onClick={ready}>Pilih</button>
    </div>
  );
}