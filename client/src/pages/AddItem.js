import React, {useState} from 'react';
import '../additem.css'
// import { storage } from '../'

export default function AddItem () {


  const[title, setTitle] = useState('')
  const[description, setDescription] = useState('')
  const[image, setImage] = useState('')
  const[price, setPrice] = useState('')
  const[category, setCategory] = useState('')
  const[wishlist, setWishlist] = useState('')


  function handlePrice(e){
    setPrice(formatRupiah(e.target.value, 'Rp'))
  }

  function SubmitCreate(e){
    e.preventDefault();
    console.log()
  }

  const [imageAsFile, setImageAsFile] = useState('')

  const handleImageAsFile = (e) => {
		const pic = e.target.files[0]
		setImageAsFile(imageFile => (pic))
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
						setImage(fireBaseUrl)
					})
			})
  }
  
  function formatRupiah(angka, prefix){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
   
    let separator
    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
   
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }
    

  return (
    <div className="additem">
      <div className="title-additem">CREATE YOUR ITEM</div>
      <div className="flex-additem">
        <form onSubmit={SubmitCreate} className="form-additem">
          <input onChange={(e)=>setTitle(e.target.value)} 
                  type="text" placeholder="title" className="input-additem"></input>
          <textarea onChange={(e)=>setDescription(e.target.value)} 
                  type="textarea" placeholder="description" rows={5} className="textarea-additem"></textarea>
          <input onChange={handlePrice} 
                  type="text" placeholder="price" value={price} className="input-additem"></input>
          <select onChange={(e)=>setCategory(e.target.value)} className="category-additem">
              <option disabled selected >Category</option>
              <option>Automotive</option>
              <option>Property</option>
              <option>Fashion</option>
              <option>Gadget</option>
              <option>Hobby</option>
              <option>Household</option>
          </select>
          <input onChange={(e)=>wishlist(e.target.value)} 
                  type="text" placeholder="wishlist" className="input-additem"></input>
          <button className="btn-additem">CREATE</button>
        </form>
        
        <div>
          <form onSubmit={handleFireBaseUpload} className="form-upload">
            <h4 className="title-upload">Upload your item picture here</h4>
            <input
              type="file"
              onChange={handleImageAsFile}
              className="input-upload"
            />
            <button type="submit" className="btn-upload">Upload</button>
            {(image!=='') && <img src={image} alt="picture" className="img-picture"></img> }
          </form>
          <div className="suggestion-additem">
            <h4>Suggestion Price</h4>
          </div>
        </div>
       
      </div>
      
        
    </div>
  );
}