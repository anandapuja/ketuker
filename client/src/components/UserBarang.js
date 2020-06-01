/* eslint-disable react/prop-types */
import React from 'react';
import deleteIcon from '../assets/images/trash.png';
import editIcon from '../assets/images/edit.png';

export default function UserBarang ({ product }) {
  return (
    <div className="product-item-list-container">
      <div className="product-item-list-image">
        <img src={product.image} alt="item" />
        <div className="product-item-list-action-img">
          <img src={deleteIcon} alt="delete" />
          <img src={editIcon} alt="edit" />
        </div>
        <p className="product-item-list-price">IDR {product.price},-</p>
      </div>
      <p className="product-item-list-title">{product.title}</p>
    </div>
  );
}
