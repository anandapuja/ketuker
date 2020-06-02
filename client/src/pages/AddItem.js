/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../additem.css';
import { storage } from '../storage/firebase';
import { HeaderSecond, NavigationSecond } from '../components';
import { useMutation } from '@apollo/react-hooks';
import { ADD_PRODUCT, GET_PRODUCTS_AND_USERS } from '../services/schema';
import { useHistory, Link } from 'react-router-dom';
import alertify from 'alertifyjs'

export default function AddItem () {

  const cheerio = require('cheerio')
  const rp = require('request-promise');

  const[title, setTitle] = useState('')
  const[description, setDescription] = useState('')
  const[image, setImage] = useState('')
  const[price, setPrice] = useState('')
  const[category, setCategory] = useState('')
  const[wishlist, setWishlist] = useState('')
  const [ addProduct ] = useMutation(ADD_PRODUCT, { refetchQueries: () => [ { query: GET_PRODUCTS_AND_USERS } ] });
  const history = useHistory();
  const[suggestion, setSuggestion] = useState('')
  const [ notif, setNotif ] = useState('')
  const [ alertInput, setAlertInput ] = useState(false);

  // scraping dengan cheerio, dengan install chrome extension di browser agar tdk kena block cors
  function cari(katakunci){
    let options = {
      uri: `https://id.priceprice.com/search/?keyword=${katakunci}`,
      transform: function (body) {
          return cheerio.load(body);
      }
    };
  
    rp(options)
        .then(function ($) {
          // console.log('masuk then')
          let name = []
          // const itemBox = $('.name')
          $('.name').each((i,el)=>{
            let item = $(el).text()
            name.push(item)
          })
          let shop = []
          $('.shop').each((i,el)=>{
            let item = $(el).text()
            shop.push(item)
          })
          let price = []
          $('.price').each((i,el)=>{
            let item = $(el).text()
            price.push(item)
          })
          let arrobj = []
          for (let i=0; i<name.length;i++){
            let obj = {
              name : name[i],
              shop : shop[i],
              price : price[i]
            }
            arrobj.push(obj)
          }
          // console.log(arrobj)
          setSuggestion(arrobj)
        })
        .catch(function (err) {
           console.log(err, 'masuk err')
        });
  }

  function handleTitle(e){
    console.log('masuk handletitle')
    setTitle(e.target.value)
    let kata = e.target.value.replace(' ','+')
    console.log(kata,"--kata")
    cari(kata)
  }

  function handlePrice(e){
    setPrice(formatRupiah(e.target.value, 'IDR '))
    //setPrice(Number(e.target.value));
  }


  async function SubmitCreate (e) {
    e.preventDefault();
    let harga1 = price.replace('IDR ','')
    let harga2 = harga1.replace('.','')
    let priceNum = Number(harga2)
    if((title === '') || (category === '') ) {
      setNotif ('title or category must be filled');
      setAlertInput(true);
    } else {
      try {
        let data={ //change as the fields required in server
          title: title,
          description: description,
          image: image,
          price: priceNum,
          category: category,
          whislist: wishlist,
          submit: false
        };
        console.log(data,"----")
        await addProduct({ variables:{ input: data } });
        alertify.notify('SUCCESS INPUT ITEM', 'success', 5, function(){  console.log('dismissed'); });
        history.push('/');
      } catch (error) {
        console.log(error, 'ERRORNY');
        setNotif ('ERROR while submiting');
        setAlertInput(true);
      }
    }
  }

  const [ imageAsFile, setImageAsFile ] = useState('');

  const handleImageAsFile = (e) => {
    const pic = e.target.files[0];
    setImageAsFile(imageFile => (pic));
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
            setImage(fireBaseUrl);
          });
      });
  };
  
  function formatRupiah (angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
   
    let separator;
    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
   
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }
    

  return (
    <>
    <HeaderSecond />
    <NavigationSecond />
    <div className="additem">
      <div className="title-register">UPLOAD BARANG</div>
      <div className="flex-additem">
        <form onSubmit={SubmitCreate} className="form-additem">
          <input onChange={handleTitle} 
                  type="text" placeholder="Nama Barang" className="input-register"></input>
          <textarea onChange={(e)=>setDescription(e.target.value)} 
                  type="textarea" placeholder="Deskripsi" rows={5} className="textarea-additem"></textarea>
          <input onChange={handlePrice} 
                  type="text" placeholder="Harga" value={price} className="input-register"></input>
          <select onChange={(e)=>setCategory(e.target.value)} className="category-additem">
              <option disabled selected value >Category</option>
              <option value="automotive">Automotive</option>
              <option value="property">Property</option>
              <option value="fashion">Fashion</option>
              <option value="gadget">Gadget</option>
              <option value="hobby">Hobby</option>
              <option value="household">Household</option>
          </select>
          <input onChange={(e)=>setWishlist(e.target.value)} 
                  type="text" placeholder="Barang apa yang kamu cari?" className="input-register"></input>
          <button className="btn-register">SUBMIT</button>
          {/* <Link to="/"><button className="btn-register">BACK</button></Link> */}
        </form>
     
        <div>
          <form onSubmit={handleFireBaseUpload} className="form-upload">
            <h4 className="title-upload-register">Upload gambar di sini.</h4>
            <input
              type="file"
              onChange={handleImageAsFile}
              className="input-upload"
              accept="image/x-png,image/jpeg"
            />
            <button type="submit" className="btn-upload">Upload</button>
          </form>
          <div className="suggestion-additem">
            <h4>Suggestion Price</h4>
            {(suggestion.length>0)&& suggestion.map((item,idx)=>(
              <div key={idx}>
                <div>{item.name}</div>
                <div>{item.shop}</div>
                <div><b>{item.price}</b></div>
                <hr></hr>
              </div>
            ))}
          </div>
          <Link to="/"><button className="btn-additem">CANCEL</button></Link>
        </div>
      </div>
      {(image!=='') && <img src={image} alt="picture" className="img-additem"></img> }
    </div>
    {alertInput && (
      <div className="modalAlert">
        <div className="Alert-flex">
          <div className="Alert-title">ALERT</div>
          <div className="Alert-content">Notification: {notif}</div>
          <div >
            <button onClick={()=>setAlertInput(false)} className="Alert-button">OK</button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}