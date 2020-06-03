import React from 'react';
import ErrorGif from '../assets/images/errorGif.gif';

function CompError ({message}) {
  return (
    <div>
      <p>{message}</p>
      <img src={ErrorGif} alt="img-error"></img>
    </div>
  );
}

export default CompError;