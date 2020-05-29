import React from 'react';

export default function WhislistDetailItemUser () {
  return (
    <div className="detail-item-user-whislist-wrap">
      <div className="item-user-whislist-image">
        <img src="https://image.freepik.com/free-psd/paper-bag-mockup_35913-1368.jpg" alt="whislist" />
      </div>
      <div className="item-user-whislist-description">
        <p className="item-user-whislist-description-title">Title</p>
        <p>Price</p>
        <p>Loc:</p>
      </div>
    </div>
  )
}