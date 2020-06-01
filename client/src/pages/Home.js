import React from 'react';
import {
  ProductItemList,
  LoadMoreButton,
  HeaderMain,
  Navigation
} from '../components';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS_AND_USERS } from '../services/schema';
import { useLocation } from 'react-router-dom';
import SliderApp from '../components/Slider';

export default function Home () {
  const { search } = useLocation();
  // const { loading, error, data } = useQuery(GET_PRODUCTS_AND_USERS, { variables: { category: search ? search.slice(10) : '' }, fetchPolicy: 'cache-and-network' });

  
    const getProducts = [{
      _id : 1,
      title : 'meja',
      description : "meja tulis",
      userId : 1,
      category : 'household',
      image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
      submit : true,
      price : 80000
     }]

    const productByCategory =[ {
      _id : 1,
      title : 'meja',
      description : "meja tulis",
      userId : 1,
      category : 'household',
      image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
      submit : true,
      price : 80000
     }]


  // if(loading) {
  //   return <p>Loading</p>;
  // }

  // if(error) {
  //   console.log(error);
  //   return <p>error ... </p>;
  // }

  // if(data) {
  //   const { getProducts } = data;
  //   const { productByCategory } = data;
    return (
      <>
        <HeaderMain />
        <Navigation />
        <SliderApp />
        <div className="home-list-container">
          <div className="home-product-list-item-container">
            {
              getProducts ?
                getProducts.map(product => (
                  <div key={ product._id }>
                  <ProductItemList product={ product } />
                  </div>
                  
                )) :
                productByCategory.map(product => (
                  <ProductItemList key={ product._id } product={ product } />
                ))
            }
          </div>
          <div className="home-load-more-container">
            <LoadMoreButton />
          </div>
        </div>
      </>
    );
  }
// }
