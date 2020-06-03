/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../additem.css';
import { storage } from '../storage/firebase';
import { HeaderSecond, NavigationSecond, CompError, CompLoading } from '../components';
import { useMutation, useQuery } from '@apollo/react-hooks';
// check query for submit edit
import { GET_PRODUCT_DETAIL, updateProduct } from '../services/schema';
import { useHistory, useParams, Link } from 'react-router-dom';
import Select from 'react-select'


let options = [
  { value: "automotive", label: "automotive" },
  { value: "property", label: "property" },
  { value: "fashion", label: "fashion" },
  { value: "gadget", label: "gadget" },
  { value: "hobby", label: "hobby" },
  { value: "household", label: "household" }
];

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

  useEffect(() => {
    if(!localStorage.getItem('token')){
      history.push('/');
    };
  },[data])

  function handlePrice (e) {
    let harga1 = e.target.value.replace('Rp. ','');
    let harga2 = harga1.replace(/[^\w\s]/gi,'');
    let priceNum = Number(harga2);
    setPrice(Number(priceNum));
  }

  async function SubmitEdit (e) {
    e.preventDefault();
    let harga1 = String(price).replace('Rp. ','');
    let harga2 = harga1.replace(/[^\w\s]/gi,'');
    let priceNum = Number(harga2);
    try {
      let data={ 
        title: title,
        description: description,
        image: image,
        price: priceNum,
        category: category,
        whislist: whislist,
        submit: false
      };
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
      setPrice(formatRupiah(oldPrice, 'Rp. '));
      setWishlist(oldWis);
    }
  }, [ data ]);

  function formatRupiah (angka, prefix) {
    var number_string = String(angka).replace(/[^,\d]/g, '').toString(),
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

  
  
  if(error) {
    return <CompError />;
  }

  if(loading) {
    return <CompLoading />;
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
                type="text" placeholder="Title" className="input-edititem"></input>
              <textarea onChange={(e)=>setDescription(e.target.value)} value = {description}
                type="textarea" placeholder="Deskripsi" rows={5} className="textarea-edititem"></textarea>
              <input onChange={handlePrice} 
                type="text" placeholder="Harga" value={price} className="input-edititem"></input>
              <Select 
                onChange={(option)=>setCategory(option.value)} 
                options={options} getOptionValue={option => option.value} />    
              
              <button className="btn-edititem">SUBMIT</button>
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
              </form>
              {(image!=='') && <img src={image} alt="picture" className="img-edititem"></img> }
            </div>     
          </div>
        </div>
      </>
    );
  }
}