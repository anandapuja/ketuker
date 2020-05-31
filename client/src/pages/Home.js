import React from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation
} from '../components';

export default function Home () {
  return (
    <>
    <HeaderMain />
    <Navigation />
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
      <div className="home-load-more-container">
        <LoadMoreButton />
      </div>
    </div>
    </>
  );
}
