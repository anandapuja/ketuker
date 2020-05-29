import React from 'react';

export default function ProductItemList () {
  return (
    <div className="product-item-list-container">
      <div className="product-item-list-image">
        <img src="https://image.freepik.com/free-psd/paper-bag-mockup_35913-1368.jpg" alt="item" />
        <p className="product-item-list-price">IDR 50.000,-</p>
      </div>
      <p className="product-item-list-title">Title</p>
      <p className="product-item-list-location">Loc: Jakarta</p>
    </div>
  );
}
