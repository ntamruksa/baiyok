import React, { useState } from 'react'
import { getCart } from '../../services/cart'
import formatMoney from '../../services/formatMoney'
import CartItem from "./CartItem";

const Cart = ({ open, hideCart }) => {
  const [cart] = useState(getCart())
  return (
    <>
      <div className='cart' open={open}>
        <header>
          <div className='close' onClick={hideCart}>
            &times;
          </div>
          <h1>Your order</h1>
          <p>You have {cart && cart.items.length} dishes in your order.</p>
        </header>
        <ul>
          {cart && cart.items.map((cartItem, idx) => <CartItem key={idx} cartItem={cartItem} />)}
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
