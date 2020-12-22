import React, { useState } from 'react'
import Nav from './Nav'
import Cart from './cart/Cart'
const Header = () => {
  const [showCart, setShowCart] = useState(false)
  
  const hideCart = () => {
    setShowCart(false)
  }
  const toggleCart = () => {
    setShowCart(!showCart)
  }
  return (
    <div className='header'>
      {/* <div className='header__logo-box'>
      <img src='/Logo-Baiyok-med.png' alt='Logo' className='header__logo' />
    </div> */}
      {/* <div className='header__text-box'>
      <h1 className='heading-primary'>
        <span className='heading-primary--main'>Bai Yok</span>
        <span className='heading-primary--est'>Est. 2001</span>
        <span className='heading-primary--sub'>Modern Thai Cuisine</span>
      </h1>
    </div> */}
      <div className='header__menu'>
        <Nav toggleCart={toggleCart}/>
      </div>
      <Cart open={showCart} hideCart={hideCart}/>
    </div>
  )
}

export default Header
