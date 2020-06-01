import React, { useState } from 'react';
import { HeaderMain, Navigation } from '../components';
import ConfirmationItem from '../components/ConfirmationItem';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { TRANSACTION, GET_TRANSACTION_BYID } from '../services/schema';
import { useHistory, useParams, useLocation } from 'react-router-dom';

export default function Confirmation () {
  const [ barter ] = useState(JSON.parse(localStorage.getItem('barter')));
  const [ addTransaction ] = useMutation(TRANSACTION);
  const history = useHistory();
  const {id} = useParams();
  const { search } = useLocation();
  const {loading, error, data} = useQuery(GET_TRANSACTION_BYID, {variables: { 
    id: id ? id : null, userId1: localStorage.getItem('userOriginal'), userId2: localStorage.getItem('userTarget')}})

  async function deal () {
    try {
      await addTransaction({variables: {input: barter}})
      localStorage.removeItem('barter');
      alert('SUCCES')
      history.push('/');
    } catch (error) {
      console.log(error, '>>>>>>>>>>>EOROREO')
    }
  }

  if (loading) {
    return <p>loading</p>
  }

  if (data || error) {
    return (
      <>
        <HeaderMain />
        <Navigation />
        <div className="confirmation-title">
          <h1>KONFIRMASI TRANSAKSI</h1>
        </div>
        <div className="confirmation-container">
          <div className="confirmation-container-half">
            <div className="confirmation-container-half-title">
              { search.slice(1) === 'diajak' ?
              <>
                <h3> 'BARANG KAMU' </h3>
                <p>{data.userTarget.username}</p>
              </>
              : 
              <>
                <h3>'BARANG ORANG' </h3>
                <p>{data.userOriginal.username}</p>
              </>
              }
            </div>
            { barter &&
              <ConfirmationItem product={barter.productTarget[0]}/>
            }
            { id &&
              <ConfirmationItem product={data.transactionById.productTarget[0]}/>
            }
          </div>
  
          <div className="confirmation-container-half">
            <div className="confirmation-container-half-title">
            { search.slice(1) === 'diajak' ?
              <>
                <h3> 'BARANG ORANG' </h3>
                <p>{data.userOriginal.username}</p>
              </>
              : 
              <>
                <h3>'BARANG KAMU' </h3>
                <p>{data.userTarget.username}</p>
              </>
              }
            </div>
            { barter &&
              barter.productOriginal.map((product, index) => (
                <ConfirmationItem product={product} key={index}/>
              ))
            }
            {
              id &&
              data.transactionById.productOriginal.map((product, index) => (
                <ConfirmationItem product={product} key={index}/>
              ))
            }
          </div>
        </div>
        { !id &&
          <div className="confirmation-button">
            <button onClick={deal} >KIRIM PERMINTAAN BARTER</button>
          </div>
        }
      </>
    );
  }
}
