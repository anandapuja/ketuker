import React from 'react';
import PropTypes from 'prop-types';

export default function UserDiajak ({ product, status }) {
  return (
    status ? 
      <div className="doasat">
        <div className="container coverApproved" style={{
          background: `url(${product[0].image })`, backgroundSize: 'cover',
          filter: 'grayscale(1) opacity(.8)'
        }}>
          <div className="overlay">
            <div className ="items"></div>
            <div className ="items head">
              <p>{product[0].title}</p>
              <hr/>
            </div>
            <div className = "items price">
              <p className="new">{product[0].price}</p>
            </div>
          </div>
        </div>
        <img 
          className="approved checked"
          src="https://www.onlygfx.com/wp-content/uploads/2016/09/green-approved-stamp-1-1024x772.png" 
          alt="item"/>
      </div>
      :
      <div className="doasat">
        <div className="container" style={{
          background: `url(${product[0].image })`, backgroundSize: 'cover',
              
        }}>
          <div className="overlay">
            <div className ="items"></div>
            <div className ="items head">
              <p>{product[0].title}</p>
              <hr/>
            </div>
            <div className = "items price">
              <p className="new">{product[0].price}</p>
            </div>
          </div>
        </div>
      </div>
        
  );
}

UserDiajak.propTypes = {
  product: PropTypes.object
};