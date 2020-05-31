/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { storage } from '../storage/firebase';
import { HeaderSecond } from '../components';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_ACCOUNT } from '../services/schema';

function Register () {
  const history = useHistory(); 
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState(''); //only to validate password
  const [ avatar, setAvatar ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ phone, setPhone ] = useState('');

  // const [signup] = useMutation(SIGNUP)
  const [ registerAccount ] = useMutation(CREATE_ACCOUNT);

  function ToLogin () {
    history.push('/login');
  }

  async function SubmitRegister (e) {
    e.preventDefault();
    if(password!==password2) {
      alert('passowrds are not same');
    } else {
      let data = {
        username: username,
        email: email,
        password: password2,
        avatar: avatar,
        address: address,
        city: city,
        phone: phone
      };
      const user = await registerAccount({ variables: { input: data } });
      const { data: { register: { token } } } = user;
      const { data: { register: { _id } } } = user;
      localStorage.setItem('token', token); //dummy token
      localStorage.setItem('user_id', _id);
      localStorage.setItem('username', username);
      history.push('/');
    }
  }

  const [ imageAsFile, setImageAsFile ] = useState('');

  const handleImageAsFile = (e) => {
    const avatar = e.target.files[0];
    setImageAsFile(imageFile => (avatar));
  };

  const handleFireBaseUpload = e => {
    e.preventDefault();
    console.log('start of upload');
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
    uploadTask.on('state_changed',
      (snapShot) => {
        console.log(snapShot);
      }, (err) => {
        console.log(err);
      }, () => {
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
          .then(fireBaseUrl => {
            console.log(fireBaseUrl, '---firebaseURl');
            setAvatar(fireBaseUrl);
          });
      });
  };

  return (
    <>
      <HeaderSecond />
      <div className="register">
        <h3 className="title-register">CREATE ACCOUNT</h3>
        <div className="div-register">
          <form onSubmit={SubmitRegister} className='form-register'>
            <input onChange={(e)=>setUsername(e.target.value)} type='text' placeholder='username' className="input-register"></input>
            <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email' className="input-register"></input> 
            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' className="input-register"></input>
            <input onChange={(e)=>setPassword2(e.target.value)} type="password" placeholder='re-type your password' className="input-register"></input>
            <input onChange={(e)=>setPhone(e.target.value)} type="number" placeholder='phone' className="input-register"></input>
            <input onChange={(e)=>setAddress(e.target.value)} type="text" placeholder='address' className="input-register"></input>
            <input onChange={(e)=>setCity(e.target.value)} type="text" placeholder='city/districk' className="input-register"></input>
            <br></br>
            <button className="btn-register">Register</button>
          </form>

          <form onSubmit={handleFireBaseUpload} className="form-upload-register">
            <h4 className="title-upload-register">Upload your avatar below.</h4>
            <input
              type="file"
              onChange={handleImageAsFile}
              className="input-upload-register"
            />
            <button type="submit" className="btn-upload-register">Upload Avatar</button>
            {(avatar!=='') && <img src={avatar} alt="profile" className="img-avatar"></img> }
          </form>
        </div>

        <div className="footer-register">Already have an account ? Sign In
          <a href="#" onClick={ToLogin}> here</a>
        </div>
      </div>
    </>
  );

}

export default Register;