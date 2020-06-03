import React from 'react';
import PropTypes from 'prop-types';

export default function UserMengajak ({ product, status }) {
  return(
    <div className="user-mengajak-item-container">
      <div className="user-mengajak-item-container-title">
        <p>{product[0].title}</p>
      </div>
      <div className="user-mengajak-item-container-status">
        <p>Status: {status ? 'APPROVED' : 'WAITING'}</p>
      </div>
    </div>
  );
}

UserMengajak.propTypes = {
  product: PropTypes.object
};