import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HeaderMain, Navigation, CompLoading, CompError } from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../services/schema';

export default function Success () {
  const history = useHistory();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      history.push('/');
    };
  },[])

  const { loading, error, data } = useQuery(GET_USER, { variables: { id: localStorage.getItem('userOriginal') } });

  if(loading) {
    return <CompLoading />;
  }

  if(error) {
    return <CompError />;
  }

  if(data) {
    return (
      <>
        <HeaderMain />
        {/* <Navigation /> */}
        <div className="success-container" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
          <div className="success-message">
            <h1>SUCCESS</h1>
            <p>Silahkan hubungin {data.getUser.username.toUpperCase()} untuk proses selanjutnya.</p>
            <p>Phone: {data.getUser.phone}</p>
            <p>Cek status permintaan barter Anda di halaman user di <Link to="/my-profile">sini!</Link></p>
            <Link to="/">
              <div className="button">
                <a style={{position: 'relative', left: '30%'}}><span>
                  Back to home
                </span></a>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
