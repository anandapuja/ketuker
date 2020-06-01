import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation () {
  return (
    <nav className="navigation-container">
      <Link to="/">
        <p>Beranda</p>
      </Link>
      <Link to="/?category=automotive">
        <p>Otomotif</p>
      </Link>
      <Link to="/?category=property">
        <p>Properti</p>
      </Link>
      <Link to="/?category=fashion">
        <p>Pakaian</p>
      </Link>
      <Link to="/?category=gadget">
        <p>Gadget</p>
      </Link>
      <Link to="/?category=hobby">
        <p>Hobi</p>
      </Link>
      <Link to="/?category=household">
        <p>Perabotan</p>
      </Link>
    </nav>
  );
} 