/* eslint-disable react/prop-types */
import React, { useState } from 'react';

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
    }
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
        status && <p>Checked</p>
      }
      <button onClick={checked}>Pilih</button>
    </div>
  );
}