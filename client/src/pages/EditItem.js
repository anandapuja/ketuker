/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../additem.css';
import { storage } from '../storage/firebase';
import { HeaderSecond, NavigationSecond } from '../components';
import { useMutation, useQuery } from '@apollo/react-hooks';
// check query for submit edit
import { GET_PRODUCT_DETAIL, updateProduct } from '../services/schema';
import { useHistory, useParams, Link } from 'react-router-dom';

export default function EditItem () {
  
  // check this query for submit
  // const [ addProduct ] = useMutation(ADD_PRODUCT, { refetchQueries: () => [ { query: GET_PRODUCTS_AND_USERS } ] });
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, { variables: { id: id } });
  const [ editProduct ] = useMutation(updateProduct);

  const[ title, setTitle ] = useState('');
  const[ description, setDescription ] = useState('');
  const[ image, setImage ] = useState('');
  const[ price, setPrice ] = useState();
  const[ category, setCategory ] = useState('');
  const[ whislist, setWishlist ] = useState('');


  function handlePrice (e) {
    setPrice(Number(e.target.value));
  }

  async function SubmitEdit (e) {
    e.preventDefault();
    try {
      let data={ 
        title: title,
        description: description,
        image: image,
        price: price,
        category: category,
        whislist: whislist,
        submit: false
      };
      console.log(data, 'fiansiodn');
      await editProduct({ variables:{ input: data, id: id } }); //------check query for submit
      history.push('/my-profile');
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

  useEffect(() => {
    if (data) {
      const { getProduct } = data;
      const { title: oldTitle , image: oldImage, description: oldDesc, price: oldPrice, category: oldCat, whislist: oldWis } = getProduct;
      setTitle(oldTitle);
      setImage(oldImage);
      setDescription(oldDesc);
      setCategory(oldCat);
      setPrice(oldPrice);
      setWishlist(oldWis);
    }
  }, [ data ]);

  
  
  if(error) {
    return <div>Error ...</div>;
  }

  if(loading) {
    return <div>Loading...</div>;
  }

  if (data) {     
    return (
      <>
        <HeaderSecond />
        <NavigationSecond />
        <div className="edititem">
          <div className="title-register">EDIT BARANG</div>
          <div className="flex-edititem">
            <form onSubmit={SubmitEdit} className="form-edititem">
              <input onChange={(e)=>setTitle(e.target.value)} value = {title}
                type="text" className="input-register"></input>
              <textarea onChange={(e)=>setDescription(e.target.value)} value = {description}
                type="textarea" placeholder="Deskripsi" rows={5} className="textarea-edititem"></textarea>
              <input onChange={handlePrice} 
                type="text" placeholder="Harga" value={price} className="input-register"></input>
              <select onChange={(e)=>setCategory(e.target.value)} className="category-edititem" value={category}>
                <option disabled >Category</option>
                <option value="automotive" >Automotive</option>
                <option value="property" >Property</option>
                <option value="fashion" >Fashion</option>
                <option value="gadget" >Gadget</option>
                <option value="hobby" >Hobby</option>
                <option value="household" >Household</option>
              </select>
              <input onChange={(e)=>setWishlist(e.target.value)} value={whislist}
                type="text" placeholder="Barang apa yang kamu cari?" className="input-register"
              ></input>
              <button className="btn-register">SUBMIT</button>
            </form>
          
            <div>
              <form onSubmit={handleFireBaseUpload} className="form-upload">
                <h4 className="title-upload-register">Ganti gambar di sini.</h4>
                <input
                  type="file"
                  onChange={handleImageAsFile}
                  className="input-upload"
                />
                <button type="submit" className="btn-upload">Upload</button>
                {(image!=='') && <img src={image} alt="picture" className="img-edititem"></img> }
              </form>
            </div>     
          </div>
        </div>
      </>
    );
  }
}