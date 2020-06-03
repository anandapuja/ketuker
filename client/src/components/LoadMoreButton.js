import React from 'react';
import PropTypes from 'prop-types';

export default function LoadMoreButton ({ page }) {
  return (
    <div className="centerButton">
      <div className="button">
        <a onClick={page}><span>
          Load more ..
        </span></a>
      </div>
    </div>
  );
}

LoadMoreButton.propTypes = {
  page: PropTypes.func
};