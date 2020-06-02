/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../additem.css';
import { storage } from '../storage/firebase';
import { HeaderSecond, NavigationSecond } from '../components';
import { useMutation } from '@apollo/react-hooks';
// check query for submit edit
import { ADD_PRODUCT, GET_PRODUCTS_AND_USERS, GET_PRODUCT_USER_AND_DETAIL } from '../services/schema';
import { useHistory, useParams, Link } from 'react-router-dom';

export default function EditItem () {
  
  // check this query for submit
  // const [ addProduct ] = useMutation(ADD_PRODUCT, { refetchQueries: () => [ { query: GET_PRODUCTS_AND_USERS } ] });
  const history = useHistory();

  //please check this query
  const { id } = useParams();
  // const { loading, error, data } = useQuery(GET_PRODUCT_USER_AND_DETAIL, { variables: { userId: localStorage.getItem('user_id'), id } });
  
      const product= {
        _id : 1,
        title : 'meja',
        description : "meja tulis",
        userId : 1,
        category : 'household',
        image : 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/11/27/40253380/40253380_1cd8302b-5e1a-4dcb-b43e-fb353f65d785_694_694.jpg',
        submit : true,
        price : 80000
       }
      console.log(product, "-----")

  const[ title, setTitle ] = useState(product? product.title : '');
  const[ description, setDescription ] = useState(product? product.description : '');
  const[ image, setImage ] = useState(product? product.image : '');
  const[ price, setPrice ] = useState(product? product.price : '');
  const[ category, setCategory ] = useState(product? product.category : '');
  const[ wishlist, setWishlist ] = useState('');


  function handlePrice (e) {
    setPrice(Number(e.target.value));
  }

  async function SubmitEdit(e) {
    e.preventDefault();
    try {
      let data={ 
        title: title,
        description: description,
        image: image,
        price: price,
        category: category,
        whislist: wishlist,
        submit: false
      };
      // await addProduct({ variables:{ input: data } });   //------check query for submit
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

  
  
  // if(error) {
  //   return <div>Error ...</div>
  // }

  // if(loading) {
  //   return <div>Loading...</div>
  // }

  // const data = true
  // if (data) {
    
      // const { getProduct: product } = data;
      // const { productByUser } = data;
      // console.log(data);
      

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
              <select onChange={(e)=>setCategory(e.target.value)} value={category} className="category-edititem">
                <option disabled selected value >Category</option>
                <option value="automotive">Automotive</option>
                <option value="property">Property</option>
                <option value="fashion">Fashion</option>
                <option value="gadget">Gadget</option>
                <option value="hobby">Hobby</option>
                <option value="household">Household</option>
              </select>
              <input onChange={(e)=>setWishlist(e.target.value)} value={wishlist}
                type="text" placeholder="Barang apa yang kamu cari?" className="input-register"></input>
              <button className="btn-register">SUBMIT</button>
              {/* <Link to="/"><button className="btn-register">BACK</button></Link> */}
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
    )

}