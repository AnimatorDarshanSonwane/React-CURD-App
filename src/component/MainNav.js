import React from 'react'
import { Link } from 'react-router-dom'

const MainNav = () => {
  return (
    <>
      <Link to={'/category'}>Category List </Link>
      <Link to={'/add-category'}>  AddCategory</Link>
    </>
  )
}

export default MainNav
