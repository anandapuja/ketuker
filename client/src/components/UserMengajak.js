import React from 'react';

export default function UserMengajak ({product}) {
  console.log(product)
  return(
    <div className="user-mengajak-item-container">
      <div className="user-mengajak-item-container-title">
        <p>{product[0].title}</p>
      </div>
      <div className="user-mengajak-item-container-status">
        <p>Status: {product.status ? 'APPROVED' : 'WAITING'}</p>
      </div>
    </div>
  );
}