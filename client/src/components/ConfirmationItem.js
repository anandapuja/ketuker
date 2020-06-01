import React from 'react';
import avatar from '../assets/images/avatar.png';

export default function ConfirmationItem () {
  return (
    <div className="confirmation-items">
      <img src={avatar} alt="item" />
      <div className="confirmation-items-title">
        <h5>Title</h5>
        <p>Price</p>
      </div>
    </div>
  );
}
