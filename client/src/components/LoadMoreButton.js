import React from 'react';

export default function LoadMoreButton ({page}) {
  return (
    <div className="home-load-more">
      <button onClick={page}>Load more ...</button>
    </div>
  );
}