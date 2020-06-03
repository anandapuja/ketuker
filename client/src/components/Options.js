import React, { useState } from 'react';
import PropTypes from 'prop-types';

import checkState from '../assets/images/check.png';


export default function DetailOptions ({ ready, product }) {
  const [ status, setStatus ] = useState(false);
  const [ price, setPrice ] = useState('')
  function checked () {
    let data = {
      _id: product._id,
      title: product.title,
      description: product.description,
      userId: product.userId,
      category: product.category,
      image: product.image,
      submit: true,
      price: product.price,
      whislist: product.whislist
    };
    setStatus(val => !val);
    ready(data);
  }
  useState(() => {
    var number_string = String(product.price).replace(/[^,\d]/g, '').toString(),
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
    setPrice(uangRupiah)
  }, [])
  return (
    <>
    <div className="product-item-list-container">
      {
        status && (
          <>
            <div className="product-item-list-image">
              <img src={product.image} alt="item" className="checked"/>
              <p className="product-item-list-price">{price}</p>
            </div>
            <p className="product-item-list-title">{product.title}</p>
            <div style={{ textAlign: 'center' }}>
              <button onClick={checked}>Batal</button>
            </div>
          </>
        )
      }
      {
        !status && (
          <>
            <div className="product-item-list-image">
              <img src={product.image} alt="item" className="unChecked"/>
              <p className="product-item-list-price">{price}</p>
            </div>
            <p className="product-item-list-title">{product.title}</p>
            <div style={{ textAlign: 'center' }}>
              <button onClick={checked}>Pilih</button>
            </div>
          </>
        )
      }
    </div>
      {/* <div class="images-selector">
        <input type="radio" id="duck" name="image" value="duck" />
        <label for="duck" class="img-card" style={{background: `url(${product.image})`, backgroundSize: 'contain'}}>
          {product.title}
        </label>
      </div> */}
    </>
  );
}

DetailOptions.propTypes = {
  ready: PropTypes.func,
  product: PropTypes.object
};

const style = {
  checked: {
    filter: 'none',
    transform: 'scaleY(1)'
  },
  
  unChecked: {
    display: 'inline-block',
    width: '250px',
    height: '200px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    transition: 'all 200ms ease-in',
    filter: 'grayscale(1) opacity(.8)'
  },
  
  hover: {
    filter: 'grayscale(0) opacity(1)'
  /*   box-shadow:  0px 8px 4px rgba(0, 0, 0, 0.3),
                 0px 10px 2px rgba(0, 0, 0, 0.1); */
  }
}