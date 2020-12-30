import React, { useState, useEffect } from 'react'
// import StripeCheckout from 'react-stripe-checkout'
import { loadStripe } from '@stripe/stripe-js'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { getCart, clearCart } from '../../services/cart'
import api from '../../services/API'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
const CheckoutCart = ({ children, cart }) => {
  // const [cart, setCart] = useState(getCart())
  const quantity = cart
    ? cart.items.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
    : 0

  // const onToken = (res) => {
  //   console.log('onToken', res.id)
  //   cart.token = res.id
  //   api
  //         .addOrder(cart)
  //         .then((orderRes) => {
  //           console.log(orderRes)
  //           clearCart()
  //         })
  //         .catch((err) => {
  //           console.error(err)
  //         })
  // }
  const handleClick = async (e) => {
    e.preventDefault()
    // Get Stripe.js instance
    const stripe = await stripePromise
    // Call your backend to create the Checkout Session
    const response = await api.addOrder(cart)
    console.log('response', response)
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: response.id
    })
    // await clearCart()
    if (result.error) {
      console.log('error', result.error.message)
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }
  return (
    // <StripeCheckout
    //   amount={cart && cart.cartSubTotal}
    //   email={cart && cart.email}
    //   name='Bai Yok'
    //   description={`Order of ${quantity} dishes`}
    //   image={cart && cart.items && cart.items.length > 0 && cart.items[0].item.image}
    //   stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
    //   currency='AUD'
    //   token={res => onToken(res)}
    // >
    //   {children}
    //   </StripeCheckout>
    <a onClick={(e) => handleClick(e)}>
      {children}
    </a>
  )
}

export default CheckoutCart
