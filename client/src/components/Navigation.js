import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation () {
  return (
    <nav className="navigation-container">
      <Link to="/?category=automotive">
        <p>Automotive</p>
      </Link>
      <Link to="/?category=property">
        <p>Property</p>
      </Link>
      <Link to="/?category=fashion">
        <p>Fashion</p>
      </Link>
      <Link to="/?category=gadget">
        <p>Gadget</p>
      </Link>
      <Link to="/?category=hobby">
        <p>Hobby</p>
      </Link>
      <Link to="/?category=household">
        <p>Household</p>
      </Link>
    </nav>
  );
} 