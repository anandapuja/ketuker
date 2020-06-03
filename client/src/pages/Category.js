import React, { useState, useEffect } from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation,
  CompError,
  CompLoading
} from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS_AND_USERS } from '../services/schema';
import { useLocation, useHistory, Link } from 'react-router-dom';
import SliderApp from '../components/Slider';
import notFoundImage from '../assets/images/404.jpg';

export default function Home () {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_PRODUCTS_AND_USERS, { variables: { category: pathname ? pathname.slice(10) : '' }, fetchPolicy: 'cache-and-network' });
  const [ page, setPage ] = useState(search ? Number(search.slice(6)) : 1);
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    if(data) {
      const notMine = data.productByCategory.filter((el) => el.userId != localStorage.getItem('user_id'));
      if(page !== 1) {
        return setProducts(notMine.slice(0, page*9));
      } else {
        return setProducts(notMine.slice(0, 9));
      }
    }
  }, [ data, page ]);

  function nextPage () {
    setPage((val)=> val+1);
    history.push({
      pathname,
      search: '?page=' + (page + 1)
    });
  }

  if(loading) {
    return <CompLoading></CompLoading>;
  }

  if(error) {
    return <CompError></CompError>;
  }

  if(data) {
    console.log(data)
    return (
      <>
        <HeaderMain />
        <Navigation />
        {/* <SliderApp /> */}
        <div className="home-list-container">
          { data.productByCategory.length === 0 ? (
            <div className="not-found-container">
              <img src={notFoundImage} alt="not-found" />
              <Link to="/"><button>BACK TO HOME</button></Link>
            </div>
          ) : (
            ""
          ) }
          <div className="home-product-list-item-container">
            {
              products.map(product => (
                <ProductItemList key={ product._id } product={ product } />
              )) 
            }
          </div>
          <div className="home-load-more-container">
            {
              products.length < data.productByCategory.length && (data.productByCategory.length > 9) && 
              <LoadMoreButton page={nextPage}/>
            }
          </div>
        </div>
      </>
    );
  }
}
