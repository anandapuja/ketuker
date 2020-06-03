import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ConfirmationItem ({ product }) {
  const [price, setPrice] = useState('')

  useEffect(() => {
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
    <div className="confirmation-items">
      <img src={product.image} alt="item" />
      <div className="confirmation-items-title">
        <h5>Nama Barang: {product.title}</h5>
        <p>Harga: {price}</p>
      </div>
    </div>
  );
}

ConfirmationItem.propTypes = {
  product: PropTypes.object
};