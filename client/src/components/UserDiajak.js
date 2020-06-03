import React from 'react';
import PropTypes from 'prop-types';

export default function UserDiajak ({ product, status }) {
  return (
        status ? 
          <div className="doasat">
            <div class="container coverApproved" style={{
              background: `url(${product[0].image })`, backgroundSize: 'contain',
              filter: 'grayscale(1) opacity(.8)'
              }}>
              <div class="overlay">
                <div class ="items"></div>
                <div class ="items head">
                  <p>{product[0].title}</p>
                  <hr/>
                </div>
                <div class = "items price">
                <p class="new">{product[0].price}</p>
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
            <div class="container" style={{
              background: `url(${product[0].image })`, backgroundSize: 'contain',
              
              }}>
              <div class="overlay">
                <div class ="items"></div>
                <div class ="items head">
                  <p>{product[0].title}</p>
                  <hr/>
                </div>
                <div class = "items price">
                <p class="new">{product[0].price}</p>
              </div>
              </div>
            </div>
          </div>
        
  );
}

UserDiajak.propTypes = {
  product: PropTypes.object
};