import React from 'react';
import PropTypes from 'prop-types';

export default function LoadMoreButton ({ page }) {
  return (
    <div className="home-load-more">
      <button onClick={page}>Load more ...</button>
    </div>
  );
}

LoadMoreButton.propTypes = {
  page: PropTypes.func
};