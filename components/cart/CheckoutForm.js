import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Row, Col } from 'react-bootstrap'

import CardSection from './CardSection'
import api from '../../services/API'
import { useRouter } from 'next/router'

export default function CheckoutForm({ isValid, cart }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: cart.pickupName,
        email: cart.email
      }
    })
    console.log('result', result)
    if (result.error) {
      console.log('error', result.error.message)
    } else {
      cart.paymentMethodId = result.paymentMethod.id
      const response = await api.addOrder(cart)
      console.log('response', response)
      router.push({
        pathname: `/checkout-success`,
        query: { orderId: response.orderId }
      })
    }
    // stripePaymentMethodHandler(result)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col className='mt-4'>
          <CardSection />
        </Col>
      </Row>
      <Row>
        <Col>
          <button
            type='submit'
            className='theme-btn mt-4'
            disabled={!stripe || !isValid}>
            Submit Payment
          </button>
        </Col>
      </Row>
    </form>
  )
}
