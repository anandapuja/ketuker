import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

import { storage } from '../src/storage/firebase'

function App () {

  const [isRegister, setRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('') //only to validate password
  const [avatar, setAvatar] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  function ToRegister(){
    setRegister(true)
  }

  function ToLogin(){
    setRegister(false)
  }

  function onHandleLogin(e){
    console.log(e.target.value,"-----")
    let str = e.target.value
    console.log(str, "---target value")
    if(str.match(/@/g)){
      console.log(str,"====email")
      setEmail(str)
    } else {
      console.log(str,"===username")
      setUsername(str)
    }
  }
  
  function SubmitLogin(e){
    e.preventDefault();
    console.log('submitLogin')
    console.log(username, "username / email", email)
    let data
    if(email){
      data= {
        email: email,
        password: password
      }
    } else {
      data= {
        username: username,
        password: password
      }
    }
    console.log(data, "---data")
  }

  function SubmitRegister(e){
    e.preventDefault()
    console.log('register')
    if(password!==password2){
      alert('passowrds are not same')
    } else {
      let data = {
        username: username,
        email: email,
        password: password2,
        avatar: avatar,
        address: address,
        phone: phone
      }
      console.log(data)
    }
  }

  const [imageAsFile, setImageAsFile] = useState('')

  const handleImageAsFile = (e) => {
		const avatar = e.target.files[0]
		setImageAsFile(imageFile => (avatar))
	}

	const handleFireBaseUpload = e => {
		e.preventDefault()
		console.log('start of upload')
		if (imageAsFile === '') {
			console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
		}
		const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
		uploadTask.on('state_changed',
			(snapShot) => {
				console.log(snapShot)
			}, (err) => {
				console.log(err)
			}, () => {
				storage.ref('images').child(imageAsFile.name).getDownloadURL()
					.then(fireBaseUrl => {
						console.log(fireBaseUrl, "---firebaseURl")
						setAvatar(fireBaseUrl)
					})
			})
	}


  if(isRegister){
    return (
      <div>
        <h3>Page Register</h3>
        <form onSubmit={SubmitRegister} 
            style={{
            display: 'flex',
            flexDirection: "column",
            width: '50%'
						}}>
          <label>Username</label>
          <input onChange={(e)=>setUsername(e.target.value)} type='text' placeholder='input your username'></input>
          <label>Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='input your email'></input>
          <label>Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} type="text"></input>
          <label>Retype Password</label>
          <input onChange={(e)=>setPassword2(e.target.value)} type="text"></input>
          <img src={avatar} alt="profile"></img>
          <label>Address</label>
          <input onChange={(e)=>setAddress(e.target.value)} type="text"></input>
          <label>Phone</label>
          <input onChange={(e)=>setPhone(e.target.value)} type="number"></input>
          <br></br>
          <button>Register</button>
        </form>

        <form onSubmit={handleFireBaseUpload}>
					Upload your avatar here
					<input
						type="file"
						onChange={handleImageAsFile}
						style={{
							width: 280,
							height: 35,
							backgroundColor: "#FAFAFA",
							fontSize: 13,
						}}
					/>
					<button 
						type="submit">Upload Avatar</button>
				</form>

        <button onClick={ToLogin}>Sign in</button>
      </div>
    )
  }


  return (
    <div>
      <h3>Page Login</h3>
      <form onSubmit={SubmitLogin}>
          <label>Username/ Email</label>
          <input onChange={onHandleLogin} type='text' placeholder='input your registered  username/email'></input>
          <label>Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} type="password"></input>
          <button>Login</button>
        </form>

      <button onClick={ToRegister}>Sign Up</button>
    </div>
  )


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
