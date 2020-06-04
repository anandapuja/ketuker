import React, { useState, useEffect } from 'react';
import { DetailItemCustomerList, HeaderMain, Navigation, CompError,
  CompLoading } from '../components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_USER_AND_DETAIL } from '../services/schema';
import DetailOptions from '../components/Options';

export default function DetailItemCustomer () {
  const history = useHistory();
  const { id } = useParams();
  const [ barterStatus, setBarterStatus ] = useState(false);
  const [ readyExchange, setReadyExchange ] = useState(false);
  const { loading, error, data } = useQuery(GET_PRODUCT_USER_AND_DETAIL, { variables: { 
    userId: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : 'def3', id } });
  const [ productOriginal, setProductOriginal ] = useState([]);
  const [ productTarget, setProductTarget ] = useState([]);
  // const [uangRupiah, setUangRupiah] = useState('')
  const [ showOut, setShowOut] = useState(false)
  const [ totalPrice, setTotal ] = useState(0)

  useEffect(() => {
    setReadyExchange(() => {
      if(productOriginal.length) return true;
      else return false;
    });
  }, [ productOriginal ]);

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
        data = [ ...val, prodTrans ];
      }
      return data;
    });
    const { __typename, ...rest } = data.getProduct;
    setProductTarget([ rest ]);
  }

  function confirmation () {
    let barter = {
      userTarget: productTarget[0].userId,
      productTarget,
      productOriginal
    };
    console.log(barter, '<<<<<ABBBRRETSD>>>>')
    const targetPrice = barter.productTarget[0].price
    let priceBarteran = 0
    barter.productOriginal.forEach(el => priceBarteran += el.price)
    var number_string = String(priceBarteran).replace(/[^,\d]/g, '').toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    
    let separator;
    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    // setUangRupiah('Rp. ' + rupiah);
    const uangRupiah = 'Rp. ' + rupiah;
    setTotal(uangRupiah)
    if (priceBarteran >= targetPrice) {
      localStorage.setItem('barter', JSON.stringify(barter));
      localStorage.setItem('userOriginal', productTarget[0].userId);
      localStorage.setItem('userTarget', localStorage.getItem('user_id'));
      history.push('/konfirmasi');
    } else {
      setShowOut(true)
    }
  }

  // useEffect(() => {
  //   const productPrice = String(product.price);
  //   if(product.price){
  //     var number_string = productPrice.replace(/[^,\d]/g, '').toString(),
  //       split = number_string.split(','),
  //       sisa = split[0].length % 3,
  //       rupiah = split[0].substr(0, sisa),
  //       ribuan = split[0].substr(sisa).match(/\d{3}/gi);
     
  //     let separator;
  //     // tambahkan titik jika yang di input sudah menjadi angka ribuan
  //     if(ribuan) {
  //       separator = sisa ? '.' : '';
  //       rupiah += separator + ribuan.join('.');
  //     }
     
  //     rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  //     setUangRupiah('Rp. ' + rupiah);
  //   } else {
  //     console.log(product.price)
  //   }
  // },[]);
  
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
    const productPrice = String(product.price);
    // if(product.price){
      var number_string = productPrice.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);
     
      let separator;
      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if(ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }
     
      rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
      // setUangRupiah('Rp. ' + rupiah);
      const uangRupiah = 'Rp. ' + rupiah;
 
    return (
      <>
        <HeaderMain />
        {/* <Navigation /> */}
        <div className="detail-item-user-container">
          <h1>{product.title}</h1>
          <div className="detail-item-user-picwhis">
            <div className="detail-item-user-image">
              <img src={product.image} alt="item" />
            </div>
            <div className="detail-item-user-descwhis">
              <h2>{uangRupiah}</h2>
              <p>{product.description}</p>
              <Link to={`/category=${product.category}`}><p style={{ marginTop:20 }}>Kategori: {product.category}</p></Link>
              {
                localStorage.getItem('token') ? (
                  <button type="button" onClick={changeBarterStatus}>AJAK BARTERAN</button>
                ) : (
                  <Link to="/login">
                    <button>AJAK BARTERAN</button>
                  </Link>
                )
              }
            </div>
          </div>

          {
            barterStatus ? (
              <div className="detail-item-user-second">
                <h1>PILIH BARANGMU</h1>
                <div className="detail-item-customer-list">
                  <div className="taek">
                    { productByUser.map(product => (
                      // <DetailItemCustomerList ready={readyToExchange} product={product} key={product._id} />
                      <DetailOptions ready={readyToExchange} product={product} key={product._id} />
                    ))}
                  </div>
                </div>
              </div>      
            ) : (
              <>
              </>
            )
          }
          {
            readyExchange && (
              <div className="button readyToExchange">
                <a onClick={confirmation}><span>
                  SELESAIKAN BARTER
                </span></a>
              </div>
            )
          }

          {showOut && (
            <div className="modalSignOut">
              <div className="SignOut-flex">
                <div className="SignOut-title">Harga barangmu tidak sebanding</div>
                <div className="SignOut-content">
                  <p>Total harga barang yang kamu barter adalah sebesar {totalPrice}</p>
                </div>
                <div style={{display:"flex", justifyContent: "space-around"}} >
                  <button onClick={() => setShowOut(false)} className="SignOut-button">CLOSE</button>
                  {/* <button onClick={CancelSignOut} className="SignOut-button">CANCEL</button> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
