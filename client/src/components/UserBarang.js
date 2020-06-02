/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import deleteIcon from '../assets/images/trash.png';
import editIcon from '../assets/images/edit.png';
import PropTypes from 'prop-types';

import { useHistory} from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { deleteProduct, GET_TRANSACTION_USER } from '../services/schema';


export default function UserBarang ({ product }) {

  const history = useHistory()
  const [ pageDelete, setPageDelete ] = useState(false)
  const [ idDelete, setIdDelete ] = useState('')
  const [ deleteProd ] = useMutation(deleteProduct, { refetchQueries: () => [{query: GET_TRANSACTION_USER , variables: { userId: localStorage.getItem('user_id')} }]})

  function ShowDelete(id){
    setIdDelete(id)
    setPageDelete(true)
  }

  function ShowEdit(id){
    console.log(id, "---id")
    history.push(`/edit/${id}`)
  }

  function CancelDelete(){
    setPageDelete(false)
  }

  function ConfirmDelete(){
    console.log(idDelete, "id to delete")
    deleteProd({variables: {id: idDelete}})
    // console.log(object)
    // tembak server
  }

  return (
    <div className="product-item-list-container">
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
        <p className="product-item-list-price">IDR {product.price},-</p>
      </div>
      <p className="product-item-list-title">{product.title}</p>
    </div>
  );
}

UserBarang.propTypes = {
  product: PropTypes.object
};