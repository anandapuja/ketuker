/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import deleteIcon from '../assets/images/trash.png';
import editIcon from '../assets/images/edit.png';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { deleteProduct, GET_TRANSACTION_USER } from '../services/schema';


export default function UserBarang ({ product }) {

  const history = useHistory();
  const [ pageDelete, setPageDelete ] = useState(false);
  const [ idDelete, setIdDelete ] = useState('');
  const [ deleteProd ] = useMutation(deleteProduct, { refetchQueries: () => [ { query: GET_TRANSACTION_USER , variables: { userId: localStorage.getItem('user_id') } } ] });
  const [uangRupiah, setUangRupiah] = useState('')

  function ShowDelete (id) {
    setIdDelete(id);
    setPageDelete(true);
  }

  function ShowEdit (id) {
    console.log(id, '---id');
    history.push(`/edit/${id}`);
  }

  function CancelDelete () {
    setPageDelete(false);
  }

  function ConfirmDelete () {
    console.log(idDelete, 'id to delete');
    deleteProd({ variables: { id: idDelete } });
    // console.log(object)
    // tembak server
  }

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

  return (
    <>
    {/* <div className="product-item-list-container">
      <div className="product-item-list-image">
        <img src={product.image} alt="item" />
        <div className="product-item-list-action-img">
          
          {pageDelete ? (
            <div className="delete-page">
              <div className="delete-flex">
                <div className="delete-title">Delete Confirmation</div>
                <div className="delete-content">Are you sure to delete this product ?</div>
                <div className="delete-button">
                  <button onClick={ConfirmDelete}>CONFIRM</button>
                  <button onClick={CancelDelete}>CANCEL</button>
                </div>
              </div>
            </div>
          ) : (
            <div onClick={()=>ShowDelete(product._id)}>
              <img src={deleteIcon} alt="delete" />
            </div>
          )
          }
          <div onClick={()=>ShowEdit(product._id)}>
            <img src={editIcon} alt="edit" />
          </div>
          
        </div>
        <p className="product-item-list-price">{uangRupiah}</p>
      </div>
      <p className="product-item-list-title">{product.title}</p>
    </div> */}

    <div class="aneh">
        <div class="container" style={product.submit ? {background: `url(${product.image })`, backgroundSize: 'cover', filter: 'grayscale(1) opacity(.8)'} : {background: `url(${product.image })`, backgroundSize: 'cover'}}>
        <div class="overlay">
          <div class = "items"></div>
          <div class = "items head">
            <p>{product.title}</p>
            <hr/>
          </div>
          <div class = "items price">
            <p class="new">{uangRupiah}</p>
          </div>
          <div class="items cart">
            {pageDelete ? (
              <div className="delete-page">
                <div className="delete-flex">
                  <div className="delete-title">Delete Confirmation</div>
                  <div className="delete-content">Are you sure to delete this product ?</div>
                  <div className="delete-button">
                    <button onClick={ConfirmDelete}>CONFIRM</button>
                    <button onClick={CancelDelete}>CANCEL</button>
                  </div>
                </div>
              </div>
            ) : (
              // <div onClick={()=>ShowDelete(product._id)}>
              //   <img src={deleteIcon} alt="delete" />
              // </div>
              <div style={{marginLeft: '10px'}} onClick={()=>ShowDelete(product._id)}>
                <i class="fas fa-trash" ></i>
                <span>Delete</span>
              </div>
            )
            }
            <div style={{marginLeft: '10px'}} onClick={()=>ShowEdit(product._id)}>
              <i class="fas fa-edit" ></i>
              <span>Edit</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

UserBarang.propTypes = {
  product: PropTypes.object
};