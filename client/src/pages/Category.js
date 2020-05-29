import React from 'react';
import { ProductItemList } from '../components';

export default function Category () {
  return (
    <div className="home-list-container">
      <div className="home-product-list-item-container">
        <ProductItemList />
        <ProductItemList />
        <ProductItemList />
        <ProductItemList />
        <ProductItemList />
        <ProductItemList />
        <ProductItemList />
        <ProductItemList />
        <ProductItemList />
      </div>
    </div>
  );
}