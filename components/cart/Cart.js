import React, { useState, useEffect } from 'react'
import { getCart } from '../../services/cart'
import formatMoney from '../../services/formatMoney'
import CartItem from "./CartItem";

const Cart = ({ open, hideCart }) => {
  const [cart, setCart] = useState(getCart())

  const refreshCart = () => {
    setCart(getCart())
  }

  useEffect(() => {
    console.log('in use effect')
    setCart(getCart())
  }, [open])

  return (
    <>
      <div className='cart' open={open}>
        <header>
          <div className='close' onClick={hideCart}>
            &times;
          </div>
          <h1>Your order</h1>
        </header>
        <ul>
          {cart && cart.items.map((cartItem, idx) => <CartItem key={idx} cartItem={cartItem} refreshCart={refreshCart}/>)}
        </ul>
        <footer>
          <h2>{cart && formatMoney(cart.cartSubTotal)}</h2>
          <button className='theme-btn'>Checkout</button>
        </footer>
      </div>
    </>
  )
}

export default Cart
