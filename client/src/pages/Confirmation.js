import React, { useState } from 'react';
import { HeaderMain, Navigation } from '../components';
import ConfirmationItem from '../components/ConfirmationItem';
import { useMutation } from '@apollo/react-hooks';
import { TRANSACTION } from '../services/schema';
import { useHistory } from 'react-router-dom';

export default function Confirmation () {
  const [ barter ] = useState(JSON.parse(localStorage.getItem('barter')));
  const [ addTransaction ] = useMutation(TRANSACTION);
  const history = useHistory();

  async function deal () {
    try {
      console.log(barter)
      await addTransaction({variables: {input: barter}})
      localStorage.removeItem('barter');
      alert('SUCCES')
      history.push('/');
    } catch (error) {
      console.log(error, '>>>>>>>>>>>EOROREO')
    }
  }

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
          <ConfirmationItem product={barter.productTarget[0]}/>
        </div>

        <div class="confirmation-container-half">
          <div className="confirmation-container-half-title">
            <h3>BARANG KAMU</h3>
          </div>
          {
            barter.productOriginal.map(product => (
              <ConfirmationItem product={product} />
            ))
          }
        </div>
      </div>
      <div className="confirmation-button">
        <button onClick={deal} >KIRIM PERMINTAAN BARTER</button>
      </div>
    </>
  );
}
