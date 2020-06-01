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
  // if (loading) {
  //   return <> loading </>;
  // }
  // if (error) {
  //   console.log(error);
  //   return <> erorr </>;
  // }
  // if (data) {
  //   const { getProduct: product } = data;
  //   const { productByUser } = data;
  //   console.log(data);

  const productByUser = [{
    _id : 1,
    title : 'meja',
    description : "meja tulis",
    userId : 1,
    category : 'household',
    image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
    submit : true,
    price : 80000
   }
]

  const product= {
    _id : 1,
    title : 'meja',
    description : "meja tulis",
    userId : 1,
    category : 'household',
    image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
    submit : true,
    price : 80000
   }

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
            !barterStatus ? (
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
//}
