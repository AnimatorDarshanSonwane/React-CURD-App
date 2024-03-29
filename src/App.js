import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AddCategory from './component/AddCategory';
import Category from './component/Category';
import RootLayout from './component/RootLayout';
import Detail from './component/Detail';
import Update from './component/Update';
import Login from './component/Login';
import Signup from './component/Signup';

const router = createBrowserRouter([
  {path:'login',element:<Login/>},
  {path:'signup',element:<Signup/>},
  {path:'dashboard',element:<RootLayout/>,children:[
    {path:'',element:<Category/>},
    {path:'category',element:<Category/>},
    {path:'add-category',element:<AddCategory/>},
    {path:'detail/:id',element:<Detail/>},
    {path:'edit/:id',element:<Update/>}
  ]}
])

function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
