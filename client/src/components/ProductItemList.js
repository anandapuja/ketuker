import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      username,
      address,
      avatar
    }
  }
`

export default function ProductItemList ({ data }) {
  const { loading, error, data: userData } = useQuery(GET_USER, {
    variables:{
      id: data.userId
    }
  });

  if(loading){
    return <p>Loading ...</p>
  }

  if(error){
    return <p> error ... </p>
  }
  
  if(userData){
    return (
      <div className="product-item-list-container">
        <div className="product-item-list-image">
          <img src="https://image.freepik.com/free-psd/paper-bag-mockup_35913-1368.jpg" alt="item" />
          <p className="product-item-list-price">IDR {data.price}</p>
        </div>
        <p className="product-item-list-title">{ data.title }</p>
        <p className="product-item-list-location">Loc: Jakarta</p>
      </div>
    );
  }
}
