import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../services/schema';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dummyImage from '../assets/images/dummy.jpg';

export default function ProductItemList ({ product }) {
  const [uangRupiah, setUangRupiah] = useState('')
  // const { loading, error, data: userData } = useQuery(GET_USER, {
  //   variables:{
  //     id: product.userId
  //   }
  // });

  // if(loading) {
  //   return <p>Loading ...</p>;
  // }

  // if(error) {
  //   console.log(error);
  //   return <p> error ... </p>;
  // }

  useEffect(() => {
    const productPrice = String(product.price);
    if(product.price){
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
      setUangRupiah('Rp. ' + rupiah);
    } else {
      console.log(product.price)
    }
  },[]);

  // if(userData) {
  //   const { getUser: { city } } = userData; 
  return (
    <div className="product-item-list-container">
      <div className="product-item-list-image">
        <img src={product.image ? product.image : dummyImage} alt="item" />
        <p className="product-item-list-price">{uangRupiah  }</p>
      </div>
      <Link to={ '/barang/' + product._id } >
        <p className="product-item-list-title">{ product.title }</p>
      </Link>
      {/* <p className="product-item-list-location">Lokasi: {product.city}</p> */}
    </div>
  );
}
ProductItemList.propTypes = {
  product: PropTypes.object
};