import axios from 'axios';
import React, { useState, useEffect } from 'react';
import picture from '../assets/picture.png';
import loader from '../assets/Spinner-3.gif';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(picture);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();
  let params = useParams();

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append('name', category);
    formData.append('photo', selectedFile);

    axios.put('http://www.localhost:3000/category/' + params.id, formData)
      .then(res => {
        setLoading(false);
        navigate('/category');
        console.log(res);
      })
      .catch(err => {
        setLoading(false);
        setHasError(true);
        setError(err.message);
        console.log(error, hasError);
      });
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://www.localhost:3000/category/' + params.id);
        setCategory(response.data.category.name);
        setImageUrl(response.data.category.photo);
        console.log(response.data);
        setHasError(false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setHasError(true);
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('An error occurred. Please try again later.');
        }
        console.log(error);
      }
    };

    fetchData();
  }, [params.id, error]); // Add params.id as a dependency to useEffect

  return (
    <>
      {isLoading && <div>
        <img alt='' src={loader} />
      </div>}

      {!isLoading && <div>
        <h1>Add New Category</h1>
        <form onSubmit={submitHandler}>
          <input value={category} onChange={(e) => { setCategory(e.target.value) }} type="text" />
          <input  onChange={(e) => { imageHandler(e) }} type="file" />
          <button type='submit' >submit</button>
          <br />
          <img alt='' style={{ width: '150px' }} src={imageUrl} />
        </form>
      </div>}
      {hasError && <div>
        <p style={{ color: 'red' }}> Error :- {error}</p>
      </div>}
    </>
  );
};

export default Update;
