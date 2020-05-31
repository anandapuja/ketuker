import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  WhislistDetailItemUser,
  HeaderMain,
  Navigation
 } from '../components';

export default function DetailItemUser () {
  const { id } = useParams();
  console.log(id);
  console.log('TSR');
  return (
    <>
      <HeaderMain />
      <Navigation />
      <div className="detail-item-user-container">
        <h1>TITLE BARANG</h1>
        <div className="detail-item-user-picwhis">
          <div className="detail-item-user-image">
            <img src="https://image.freepik.com/free-psd/paper-bag-mockup_35913-1368.jpg" alt="item" />
          </div>
          <div className="detail-item-user-descwhis">
            <h2>REKOMENDASI BARTERAN</h2>
            <WhislistDetailItemUser />
            <WhislistDetailItemUser />
            <WhislistDetailItemUser />
            <WhislistDetailItemUser />
            <WhislistDetailItemUser />
            <WhislistDetailItemUser />
            <WhislistDetailItemUser />
          </div>
        </div>
        <div className="detail-item-user-second">
          <h1>PRICE</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          <Link to="/category"><p className="detail-item-user-second-category">Category</p></Link>
        </div>      
      </div>
    </>
  );
}
