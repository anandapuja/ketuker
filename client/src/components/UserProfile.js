import React from 'react';
import profileImage from '../assets/images/avatar.png';

export default function UserProfile () {
  return (
    <div className="user-profile-first">
      <div className="user-profile-container-image">
        <img src={ profileImage } alt="avatar" />
      </div>
      <div className="user-profile-container-description">
        <h2>Username</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
        <p>Loc: </p>
      </div>
    </div>
  );
}
