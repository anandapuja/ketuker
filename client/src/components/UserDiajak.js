import React from 'react';
import PropTypes from 'prop-types';

export default function UserDiajak ({ product }) {
  return (
    <div className="product-item-list-container">
      <div className="product-item-list-image">
        <img src={product[0].image} alt="item" />
        <p className="product-item-list-price">IDR {product[0].price},-</p>
      </div>
      <p className="product-item-list-title">{product[0].title}</p>
    </div>
  );
}

UserDiajak.propTypes = {
  product: PropTypes.object
};