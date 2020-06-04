import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/avatar.png';
import { Link, useHistory } from 'react-router-dom';
import logoutIcon from '../assets/images/logout.png';
import faqIcon from '../assets/images/faq.jpg';
import alertify from 'alertifyjs';
import logoBw from '../assets/images/logo-bw.png';
import logoBwInvert from '../assets/images/logo-bw-invert.png';
import logoutIconRound from '../assets/images/logout.png';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../services/schema';
import SliderApp from './Slider';

export default function HeaderMain () {

  const history = useHistory();

  const [ showOut, setShowOut ] = useState(false);
  const [ filter, setFilter] = useState('')
  const { loding, error, data } = useQuery(GET_USER, {variables: {id: localStorage.getItem('user_id')}})

  function ShowSignOut () {
    setShowOut(true);
  }

  function ConfirmSignOut () {
    localStorage.clear();
    alertify.notify('LOGOUT SUCCESS', 'success', 5, function () { console.log('dismissed'); });
    setShowOut(false);
    history.push('/');
  }

  function CancelSignOut () {
    setShowOut(false);
  }

  function ToUploadBarang () {
    if(localStorage.getItem('token')) {
      history.push('/additem');
    } else {
      history.push('/login');
    }
  }

  function search (e) {
    e.preventDefault()
    setFilter('')
    history.push('/?filter=' + filter)
  }

  return (
    // <div className="header-container">
    //   <Link to="/">
    //     <div className="logo-container">
    //       <img src={logo} alt="logo" />
    //     </div>
    //   </Link>
    //   <div className="header-search-container">
    //     <form onSubmit={search}>
    //       <input type="text" placeholder="cari barang lalu tekan enter" onChange={(e) => setFilter(e.target.value)} value={filter}/>
    //     </form>
    //   </div>
    //   <div className="header-user-container">
    //     {localStorage.getItem('token') &&
    //       <Link to={ localStorage.getItem('token') ? '/additem' : '/login' }>
    //         <div className="button">
    //           <a><span>
    //             Upload Barang
    //           </span></a>
    //         </div>
    //       </Link>
    //     }
    //     <Link to={ localStorage.getItem('token') ? '/my-profile' : '/login' }>
    //       <img src={data ? data.getUser.avatar : avatar} alt="avatar" />
    //     </Link>
    //     <Link to="/faq">
    //       <div style={{ border: 'none', borderRadius: 0, marginLeft: 10, }}>
    //         <img src={faqIcon} alt="logo" />
    //       </div>
    //     </Link>
    //     <div>
         
    //       {localStorage.getItem('token') && (
    //         <div onClick={ShowSignOut}>
    //           <img style={{ border: 'none', borderRadius: 0, marginLeft: 10, cursor: "pointer" }} src={logoutIconRound} alt="logout" />
    //         </div>
    //       )}
          
    //     </div>
    //   </div>
    //   {showOut && (
    //     <div className="modalSignOut">
    //       <div className="SignOut-flex">
    //         <div className="SignOut-title">Sign Out Confirmation</div>
    //         <div className="SignOut-content">Are you sure to sign out ?</div>
    //         <div style={{display:"flex", justifyContent: "space-around"}} >
    //           <button onClick={ConfirmSignOut} className="SignOut-button">CONFIRM</button>
    //           <button onClick={CancelSignOut} className="SignOut-button">CANCEL</button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
     
    // </div>
    <div className="headerAdvance">
      <nav>
          <img src={logoBw} alt="logo" className="logocustom"/>
          <div class="logo">
          </div>
          <ul>
              <li><a >
                <Link to={ localStorage.getItem('token') ? '/my-profile' : '/login' }>
                  {data&&data.getUser.username ? data.getUser.username : 'Login/Register'}
                </Link>
              </a></li>
              <li><a >
              {localStorage.getItem('token') &&
                <Link to={ localStorage.getItem('token') ? '/additem' : '/login' }>
                      Upload Barang
                </Link>
              }
              </a></li>
              <li><a >
                <Link to="/faq">
                  Faq
                </Link>
              </a></li>
              <li><a >{localStorage.getItem('token') && (
                <div onClick={ShowSignOut}>
                  Sign Out
                </div>
              )}
          </a></li>
          </ul>
          <div className="secondTab">
            <ul>
              <li>
                <a>
                  <Link to="/">
                    <h1>

                    BERANDA
                    </h1>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to="/category=automotive">
                  <div >
                    <h1>

                    OTOMOTIF
                    </h1>
                  </div>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to="/category=property">
                    <div >
                      <h1>
                      PROPERTI

                      </h1>
                    </div>
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to="/category=fashion">
                    <div >
                      <h1>
                      FASHION

                      </h1>
                    </div>
                  </Link> 
                </a>
              </li>
              <li>
                <a>
                  <Link to="/category=gadget">
                    <div>
                      <h1>
                        GADGET
                        </h1>
                    </div>
                  </Link>
                </a>
              </li>
              <li>
                <a>
              <Link to="/category=hobby">
                  <div >
                    <h1>HOBI</h1>
                  </div>
              </Link>
                </a>

              </li>
              <li>
                <a>
              <Link to="/category=household">
                  <div >
                    <h1>HOUSEHOLD</h1>
                  </div>
              </Link>
                </a>
              </li>
            </ul>
          </div>
      </nav>
      <header>
          <div class="headline">
              <div class="inner">
                  <h1>KETUKER</h1>
                  <p>Barterin [ Barang ] Mu Bro..</p>
              </div>
          </div>
      </header>
      {showOut && (
        <div className="modalSignOut">
          <div className="SignOut-flex">
            <div className="SignOut-title">Sign Out Confirmation</div>
            <div className="SignOut-content">Are you sure to sign out ?</div>
            <div style={{display:"flex", justifyContent: "space-around"}} >
              <button onClick={ConfirmSignOut} className="SignOut-button">CONFIRM</button>
              <button onClick={CancelSignOut} className="SignOut-button">CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// var $headline = $('.headline'),
//     $inner = $('.inner'),
//     $nav = $('nav'),
//     navHeight = 75;

// $(window).scroll(function() {
//   var scrollTop = $(this).scrollTop(),
//       headlineHeight = $headline.outerHeight() - navHeight,
//       navOffset = $nav.offset().top;

//   $headline.css({
//     'opacity': (1 - scrollTop / headlineHeight)
//   });
//   $inner.children().css({
//     'transform': 'translateY('+ scrollTop * 0.4 +'px)'
//   });
//   if (navOffset > headlineHeight) {
//     $nav.addClass('scrolled');
//   } else {
//     $nav.removeClass('scrolled');
//   }
// });