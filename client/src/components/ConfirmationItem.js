import React from 'react';
import PropTypes from 'prop-types';

export default function ConfirmationItem ({ product }) {
  return (
    <div className="confirmation-items">
      <img src={product.image} alt="item" />
      <div className="confirmation-items-title">
        <h5>{product.title}</h5>
        <p>{product.price}</p>
      </div>
    </div>
  );
}

ConfirmationItem.propTypes = {
  product: PropTypes.object
};