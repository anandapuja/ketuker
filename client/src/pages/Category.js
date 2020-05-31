import React from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation
} from '../components';

export default function Category () {
  return (
    <>
      <HeaderMain />
      <Navigation />
      <div className="home-list-container">
        <h1>PROPERTY</h1>
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
        <div className="home-load-more-container">
          <LoadMoreButton />
        </div>
      </div>
    </>
  );
}