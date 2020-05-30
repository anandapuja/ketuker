import React from 'react';
import deleteIcon from '../assets/images/trash.png';
import editIcon from '../assets/images/edit.png';

export default function UserBarang () {
  return (
    <div className="product-item-list-container">
      <div className="product-item-list-image">
        <img src="https://image.freepik.com/free-psd/paper-bag-mockup_35913-1368.jpg" alt="item" />
        <div className="product-item-list-action-img">
          <img src={deleteIcon} alt="delete" />
          <img src={editIcon} alt="edit" />
        </div>
        <p className="product-item-list-price">IDR 50.000,-</p>
      </div>
      <p className="product-item-list-title">Title</p>
    </div>
  )
}
