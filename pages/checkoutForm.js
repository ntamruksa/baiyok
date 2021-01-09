import React from 'react'

import Link from 'next/link'
import { Container } from 'react-bootstrap'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

import CheckoutForm from '../components/cart/CheckoutForm'
// import styles from '../styles/Home.module.css'

export default function CheckoutPage() {
  return (
    // <Container>
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      </>
    // </Container>
  )
}
