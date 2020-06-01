import React from 'react';
import { HeaderMain, Navigation } from '../components';
import ConfirmationItem from '../components/ConfirmationItem';

export default function Confirmation () {
  return (
    <>
      <HeaderMain />
      <Navigation />
      <div className="confirmation-title">
        <h1>KONFIRMASI TRANSAKSI</h1>
      </div>
      <div className="confirmation-container">
        <div class="confirmation-container-half">
          <div className="confirmation-container-half-title">
            <h3>BARANG ORANG</h3>
          </div>
          <ConfirmationItem />
        </div>

        <div class="confirmation-container-half">
          <div className="confirmation-container-half-title">
            <h3>BARANG KAMU</h3>
          </div>
          <ConfirmationItem />
          <ConfirmationItem />
          <ConfirmationItem />
          <ConfirmationItem />
          <ConfirmationItem />
          <ConfirmationItem />
          <ConfirmationItem />
        </div>
      </div>
      <div className="confirmation-button">
        <button>KIRIM PERMINTAAN BARTER</button>
      </div>
    </>
  );
}
