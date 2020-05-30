import React from 'react';

export default function UserNavigation ({ barang, mengajak, diajak }) {
  return (
    <nav className="user-navigation">
      <div onClick={barang} className="user-navigation-list">
        <p>BARANG</p>
      </div>
      <div onClick={mengajak} className="user-navigation-list">
        <p>MENGAJAK BARTER</p>
      </div>
      <div onClick={diajak} className="user-navigation-list">
        <p>DIAJAK BARTER</p>
      </div>
    </nav>
  );
}
