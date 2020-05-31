import React from 'react';
import profileImage from '../assets/images/avatar.png';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      username,
      address,
      avatar
    }
  }
`

export default function UserProfile () {
  const { loading, error, data } = useQuery(GET_USER, {
    variables:{
      id: localStorage.getItem('user_id')
    }
  });

  if(loading){
    return(
      <p>Loading ...</p>
    )
  }

  if(error){
    return(
      <p>Error ...</p>
    )
  }

  if(data){
    return (
      <div className="user-profile-first">
        <div className="user-profile-container-image">
          <img src={ data.getUser.avatar } alt="avatar" />
        </div>
        <div className="user-profile-container-description">
          <h2>{data.getUser.username}</h2>
          <p>Address: {data.getUser.address}</p>
          <p>Loc: </p>
        </div>
      </div>
    );
  }
}
