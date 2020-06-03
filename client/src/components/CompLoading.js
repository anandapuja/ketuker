import React from 'react';
import '../loading.css';

function Loading () {
  return (
    <div id="circle">
      <div className="loader">
        <div className="loader">
          <div className="loader">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;