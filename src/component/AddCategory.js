import axios from 'axios';
import React, { useState } from 'react'
import picture from '../assets/picture.png'
import loader from '../assets/Spinner-3.gif'
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

const [category,setCategory] = useState('');
const [selectedFile,setSelectedFile] =useState(null);
const [imageUrl, setImageUrl] = useState(picture);
const [isLoading, setLoading] = useState(false);
const [hasError, setHasError] = useState(false);
const [error,setError] = useState('');


let navigate = useNavigate();

const imageHandler =(e)=>{
  setSelectedFile(e.target.files[0]);
  setImageUrl(URL.createObjectURL(e.target.files[0]));

}


const submitHandler =(event)=>{
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append('name',category);
    formData.append('photo',selectedFile);

    axios.post('http://www.localhost:3000/category',formData)
    .then(res=>{
      setLoading(false);
      navigate('/category');
      console.log(res);
    }).catch(err=>{
      setLoading(false);
      setHasError(true);
      setError(err.message);
      console.log(error,hasError);

       })

}    

  return (
    <>
    {isLoading && <div>
      <img alt='' src={loader}  />
    </div>}

    {!isLoading && <div>
    <h1>Add New Category</h1>
    <form onSubmit={submitHandler}>
        <input onChange={(e)=>{setCategory(e.target.value)}} type="text" />
        <input onChange={(e)=>{imageHandler(e)}} type="file" />
        <button type='submit' >submit</button> 
        <br/>
        <img alt='' style={{width:'150px'}} src={imageUrl} />
    </form>
    </div>}
{hasError && <div>
  <p style={{color:'red'}}> Error :- {error}</p>
</div>}

      </>
  )
}
export default AddCategory