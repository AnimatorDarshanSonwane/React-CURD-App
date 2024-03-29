import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loader from '../assets/Spinner-3.gif'

const Detail = () => {
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [error,setError] = useState('');

  let params = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://www.localhost:3000/category/' + params.id);
        setCategory(response.data.category); // Assuming the data is in the response.data property
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
  }, [params.id,error]); // Add params.id as a dependency to useEffect

  return (
    <>
    {isLoading && <div>
      <img alt='' src={loader}  />
    </div>}

    {!isLoading && !hasError&& <div>
      <img alt='' style={{width:'150px'}} src={category.photo} />
      <h2>{category.name}</h2>
    </div>}

    {hasError && <div>
  <p style={{color:'red'}}> Error :- {error}</p>
</div>}
    </>

    
  );
};

export default Detail;
