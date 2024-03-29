import axios from 'axios';
import React, { useEffect, useState } from 'react'
import loader from '../assets/Spinner-3.gif'
import { useNavigate } from 'react-router-dom';


const Category = () => {

const [categoryList,setCategoryList]=  useState([]);
const [isLoading, setLoading] = useState(false);
const [hasError, setHasError] = useState(false);
const [error,setError] = useState('')

let navigate = useNavigate();

const detailRoute = (id)=>{
 navigate('/detail/'+id);
}

const editRoute = (id)=>{
  navigate('/edit/'+id);
 }

const deleteData =(id,imageLink)=>{

  if (window.confirm('Are your sure')){

    axios.delete('http://www.localhost:3000/category?id='+id+'&imageUrl='+imageLink)
    .then(res=>{
      console.log(res);

      fetchData();

    }).catch(err=>{
      console.log(err);
    });

  }else{
    console.log("cancel");

  }


}

 const fetchData = async()=>{
  try {
    const response = await axios.get('http://www.localhost:3000/category');
    setCategoryList(response.data.category);
    setLoading(false);
    setHasError(false);
  } catch (err) {
    setLoading(false);
    setHasError(true);
    if (err.response) {
      // Server responded with an error
      setError(err.response.data.message);
    } else {
      // Network error or other unexpected errors
      setError('An error occurred. Please try again later.');
    }
    console.error(err); // Log the full error for debugging
  }

}

useEffect(()=>{
setLoading(true);



// axios.get('http://www.localhost:3000/category')
// .then(res=>{
//   setLoading(false);
//   setHasError(false);
//   console.log(res.data.category);
//   setCategoryList(res.data.category);
//   console.log(categoryList[0].name)
// })
// .catch(err=>{
//   setLoading(false);
//   setHasError(true);
//   setError(err.response.data.message);
//   console.log(err.response.data.message);

// })


fetchData();

},[]);


  return (
    <>
  {isLoading && <div>
      <img alt='' src={loader}  />
    </div>}

  {!isLoading && !hasError && <div>
    <h1>Category List </h1>
    
    <table>
      <thead>
        <tr> 
          <th>Name</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {categoryList?.map((data)=>(<Row key={data._id} detailReq={detailRoute} editReq={editRoute} deleteReq={deleteData} detail ={data}/>))}
      </tbody>
    </table>
    </div>}

    {hasError && <div>
  <p style={{color:'red'}}> Error :- {error}</p>
</div>}
    </>
  )
}

const Row = (props)=>{
  return (
        <tr key={props.detail._id}>
          <td>{props.detail.name}</td>
          <td><img alt='' style={{width:'100px'}} src={props.detail.photo}/></td>
          <td><button onClick={()=>{props.detailReq(props.detail._id)}} >Detail</button></td>
          <td><button onClick={()=>{props.editReq(props.detail._id)}}>Edit</button></td>
          <td><button onClick={()=>{props.deleteReq(props.detail._id, props.detail.photo)}} >Delete</button></td>
        </tr>
  )
}

export default Category
