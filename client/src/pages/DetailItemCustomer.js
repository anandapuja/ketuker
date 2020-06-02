import React, { useState, useEffect } from 'react';
import { DetailItemCustomerList, HeaderMain, Navigation, CompError,
  CompLoading } from '../components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_USER_AND_DETAIL } from '../services/schema';

export default function DetailItemCustomer () {
  const history = useHistory();
  const { id } = useParams();
  const [ barterStatus, setBarterStatus ] = useState(false);
  const [ readyExchange, setReadyExchange ] = useState(false);
  const { loading, error, data } = useQuery(GET_PRODUCT_USER_AND_DETAIL, { variables: { userId: localStorage.getItem('user_id'), id } });
  const [ productOriginal, setProductOriginal ] = useState([]);
  const [ productTarget, setProductTarget] = useState([]);

  useEffect(() => {
    setReadyExchange((val) => {
      if(productOriginal.length) return true
      else return false
    });
  }, [productOriginal])

  function changeBarterStatus () {
    setBarterStatus(true);
  }

  function readyToExchange (prodTrans) {
    setProductOriginal(val => {
      const existingVal = val.filter(el => el._id === prodTrans._id);
      let data;
      if(existingVal.length) {
        data = val.filter(el => el._id !== prodTrans._id);
      } else {
        data = [...val, prodTrans]
      }
      return data
    })
    const { __typename, ...rest } = data.getProduct
    setProductTarget([rest])
  }

  function confirmation () {
    let barter = {
      userTarget: productTarget[0].userId,
      productTarget,
      productOriginal
    }
    localStorage.setItem('barter', JSON.stringify(barter))
    history.push('/konfirmasi')
  }
  
  if (loading) {
    return <CompLoading></CompLoading>;
  }
  if (error) {
    console.log(error);
    return <CompError></CompError>;
  }
  if (data) {
    const { getProduct: product } = data;
    const { productByUser } = data;
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
                    <DetailItemCustomerList ready={readyToExchange} product={product} key={product._id} />
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
              <button className="readyToExchange" onClick={confirmation}>SELESAIKAN BARTER</button>
            )
          }
        </div>
      </>
    );
  }
}
