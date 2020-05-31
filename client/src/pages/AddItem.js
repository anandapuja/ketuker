/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../additem.css';
import { storage } from '../storage/firebase';
import { HeaderSecond, NavigationSecond } from '../components';
import { useMutation } from '@apollo/react-hooks';
import { ADD_PRODUCT, GET_ALL_PRODUCT, GET_PRODUCT_CATEGORY } from '../services/schema';
import { useHistory } from 'react-router-dom';

export default function AddItem () {
  const[ title, setTitle ] = useState('');
  const[ description, setDescription ] = useState('');
  const[ image, setImage ] = useState('');
  const[ price, setPrice ] = useState('');
  const[ category, setCategory ] = useState('');
  const[ wishlist, setWishlist ] = useState('');
  const [ addProduct ] = useMutation(ADD_PRODUCT, { refetchQueries: () => [ { query: GET_PRODUCT_CATEGORY } ] });
  const history = useHistory();
  // const [addMovie] = useMutation(ADD_MOVIE,{refetchQueries:[{query:GET_MOVIES}]});
  function handlePrice (e) {
    // setPrice(formatRupiah(e.target.value, 'Rp'))
    setPrice(Number(e.target.value));
  }


  async function SubmitCreate (e) {
    e.preventDefault();
    try {
      let data={ //change as the fields required in server
        title: title,
        description: description,
        image: image,
        price: price,
        category: category,
        whislist: wishlist,
        submit: false
      };
      await addProduct({ variables:{ input: data } });
      history.push('/');
    } catch (error) {
      console.log(error, 'ERRORNY');
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
   
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }
    

  return (
    <>
      <HeaderSecond />
      <NavigationSecond />
      <div className="additem">
        <div className="title-register">UPLOAD BARANG</div>
        <div className="flex-additem">
          <form onSubmit={SubmitCreate} className="form-additem">
            <input onChange={(e)=>setTitle(e.target.value)} 
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
              />
              <button type="submit" className="btn-upload">Upload</button>
              {(image!=='') && <img src={image} alt="picture" className="img-picture"></img> }
            </form>
            <div className="suggestion-additem">
              <h4>Rekomendasi harga</h4>
            </div>
          
          </div>     
        </div>
      </div>
    </>
  );
}