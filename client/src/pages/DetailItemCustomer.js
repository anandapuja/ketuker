import React, { useState } from 'react';
import { DetailItemCustomerList } from '../components';
import { Link } from 'react-router-dom';

export default function DetailItemCustomer () {
  const [barterStatus, setBarterStatus] = useState(false);
  const [readyExchange, setReadyExchange] = useState(false);

  function changeBarterStatus () {
    setBarterStatus(true);
  }

  function readyToExchange () {
    setReadyExchange(true);
  }

  return (
    <div className="detail-item-user-container">
      <h1>TITLE BARANG</h1>
      <div className="detail-item-user-picwhis">
        <div className="detail-item-user-image">
          <img src="https://image.freepik.com/free-psd/paper-bag-mockup_35913-1368.jpg" alt="item" />
        </div>
        <div className="detail-item-user-descwhis">
          <h2>IDR 50.000 K</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          <Link to="/category"><p style={{marginTop:20}}>Kategori: Automotiv</p></Link>
          <button type="button" onClick={changeBarterStatus}>AJAK BARTERAN</button>
        </div>
      </div>
      {
        barterStatus ? (
          <div className="detail-item-user-second">
            <h1>PILIH BARANGMU</h1>
            <div className="detail-item-customer-list">
              <DetailItemCustomerList ready={readyToExchange} />
              <DetailItemCustomerList />
              <DetailItemCustomerList />
              <DetailItemCustomerList />
              <DetailItemCustomerList />
              <DetailItemCustomerList />
            </div>
          </div>      
        ) : (
          <>
          </>
        )
      }
      {
        readyExchange && (
          <button className="readyToExchange">SELESAIKAN BARTER</button>
        )
      }
    </div>
  );
}
