import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation () {
  return (
    // <nav className="navigation-container">
    //   <Link to="/">
    //     <p>Beranda</p>
    //   </Link>
    //   <Link to="/category=automotive">
    //     <p>Otomotif</p>
    //   </Link>
    //   <Link to="/category=property">
    //     <p>Properti</p>
    //   </Link>
    //   <Link to="/category=fashion">
    //     <p>Pakaian</p>
    //   </Link>
    //   <Link to="/category=gadget">
    //     <p>Gadget</p>
    //   </Link>
    //   <Link to="/category=hobby">
    //     <p>Hobi</p>
    //   </Link>
    //   <Link to="/category=household">
    //     <p>Perabotan</p>
    //   </Link>
    // </nav>
    <div className="sideNav">
      <Link to="/">
        <a>
          <div id="btn1" class="button">
            <h1>BERANDA</h1>
          </div>
        </a>
      </Link>
      <Link to="/category=automotive">
        <a>
          <div id="btn2" class="button">
            <h1>OTOMOTIF</h1>
          </div>
        </a>
      </Link>
      <Link to="/category=property">
        <a>
          <div id="btn3" class="button">
            <h1>PROPERTI</h1>
          </div>
        </a>
      </Link>
      <Link to="/category=fashion">
        <a>
          <div id="btn4" class="button">
            <h1>FASHION</h1>
          </div>
        </a>
      </Link>
      <Link to="/category=gadget">
        <a>
          <div id="btn5" class="button">
            <h1>GADGET</h1>
          </div>
        </a>
      </Link>
      <Link to="/category=hobby">
        <a>
          <div id="btn6" class="button">
            <h1>HOBI</h1>
          </div>
        </a>
      </Link>
      <Link to="/category=household">
        <a>
          <div id="btn7" class="button">
            <h1>HOUSEHOLD</h1>
          </div>
        </a>
      </Link>
    </div>
  );
} 