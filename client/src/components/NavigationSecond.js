import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationSecond () {
  return (
    <nav className="navigation-container-second">
      <Link to="/">
        <div className="arrow-header-left"></div>
      </Link>
      {/* <p>Automotive</p>
      <p>Property</p>
      <p>Fashion</p>
      <p>Gadget</p>
      <p>Hobby</p>
      <p>Household</p> */}
    </nav>
  );
}
