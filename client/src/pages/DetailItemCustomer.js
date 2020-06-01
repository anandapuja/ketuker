import React, { useState } from 'react';
import { DetailItemCustomerList, HeaderMain, Navigation } from '../components';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_USER_AND_DETAIL } from '../services/schema';

export default function DetailItemCustomer () {
  const [ barterStatus, setBarterStatus ] = useState(false);
  const [ readyExchange, setReadyExchange ] = useState(false);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT_USER_AND_DETAIL, { variables: { userId: localStorage.getItem('user_id'), id } });
  function changeBarterStatus () {
    setBarterStatus(true);
  }

  function readyToExchange () {
    setReadyExchange(true);
  }
  if (loading) {
    return <> loading </>;
  }
  if (error) {
    console.log(error);
    return <> erorr </>;
  }
  if (data) {
    const { getProduct: product } = data;
    const { productByUser } = data;
    console.log(data);
    return (
      <>
        <HeaderMain />
        <Navigation />
        <div className="detail-item-user-container">
          <h1>{product.title}</h1>
          <div className="detail-item-user-picwhis">
            <div className="detail-item-user-image">
              <img src={product.image} alt="item" />
            </div>
            <div className="detail-item-user-descwhis">
              <h2>IDR {product.price}</h2>
              <p>{product.description}</p>
              <Link to={`/?category=${product.category}`}><p style={{ marginTop:20 }}>Kategori: {product.category}</p></Link>
              <button type="button" onClick={changeBarterStatus}>AJAK BARTERAN</button>
            </div>
          </div>
          {
            barterStatus ? (
              <div className="detail-item-user-second">
                <h1>PILIH BARANGMU</h1>
                <div className="detail-item-customer-list">
                  { productByUser.map(product => (
                    <DetailItemCustomerList ready={readyToExchange} product={product} key={product._id}/>
                  ))}
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
      </>
    );
  }
}
