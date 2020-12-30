import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCart } from '../../services/cart'
import formatMoney from '../../services/formatMoney'
import CartItem from './CartItem'
import CheckoutCart from './CheckoutCart'

const Cart = ({ open, hideCart, setGlobalCart }) => {
  const [cart, setCart] = useState(getCart())

  const refreshCart = () => {
    setCart(getCart())
    setGlobalCart(getCart())
  }

  useEffect(() => {
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
          {cart &&
            cart.items.map((cartItem, idx) => (
              <CartItem
                key={idx}
                cartItem={cartItem}
                refreshCart={refreshCart}
              />
            ))}
        </ul>
        <footer>
          <h2>{formatMoney(cart ? cart.cartTotal : 0)}</h2>
          <Link href='/checkout'>
                <button
                className='theme-btn'
                disabled={!cart || (cart && cart.items.length === 0)}
                onClick={()=> hideCart()}
                >Checkout</button>
          </Link>
          {/* <CheckoutCart cart={cart}>
            <button className='theme-btn'>Checkout</button>
          </CheckoutCart> */}
        </footer>
      </div>
    </>
  )
}

export default Cart
