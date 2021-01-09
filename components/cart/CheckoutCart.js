import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Spinner, Row } from 'react-bootstrap'
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import api from '../../services/API'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
const CheckoutCart = ({ children, cart, isValid }) => {
  const [loading, setLoading] = useState(false)
  const quantity = cart
    ? cart.items.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
    : 0

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)
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
    setLoading(false)
  }
  return (
    // <a onClick={(e) => handleClick(e)}>
    //   {loading ? (
    //     <Row className='theme-btn mt-4 ml-1' disabled>
    //       <Spinner
    //         animation='border'
    //         aria-hidden='true'
    //         className='mr-3'
    //       />
    //       Loading...
    //     </Row>
    //   ) : (
    //    children
    //   )}
    // </a>
    <Elements stripe={stripePromise}>
      <CheckoutForm isValid={isValid} cart={cart}/>
    </Elements>
  )
}

export default CheckoutCart
