import React from 'react'
import { Form } from 'react-bootstrap'
import formatMoney from '../../services/formatMoney'
import CartItemCheckout from './CartItemCheckout'

const CheckoutOrderDetail = ({ cart }) => {
  return (
    <Form className='form'>
      <div className='cart-checkout'>
        <header>
          <h2>Your order</h2>
        </header>
        <ul>
          {cart &&
            cart.items.map((cartItem, idx) => (
              <CartItemCheckout key={idx} cartItem={cartItem} />
            ))}
        </ul>
        <footer>
          <h2>TOTAL {cart && formatMoney(cart.cartSubTotal)}</h2>
        </footer>
      </div>
    </Form>
  )
}

export default CheckoutOrderDetail
