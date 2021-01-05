import { withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import api from '../services/API'
import formatMoney from '../services/formatMoney'
import CartItemCheckout from '../components/cart/CartItemCheckout'
import { clearCart, getCart } from '../services/cart'
// import styles from '../styles/Home.module.css'

const CheckoutSuccess = ({ orderId, refreshCart, setGlobalCart }) => {
  const [order, setOrder] = useState({})
  useEffect(() => {
    async function fetchData() {
      clearCart()
      setGlobalCart(getCart())
      const response = orderId ? await api.getOrder(orderId) : undefined
      setOrder(response)
      await api.sendOrderEmail(orderId)
    }
    fetchData()
  }, [])

  return (
    <Container>
      <section className='section-thankyou'>
        {order ? (
          <div className='u-center-text u-margin-bottom-big'>
            <h2 className='heading-secondary u-margin-bottom-small'>
              Checkout Success
            </h2>
            <p className='paragraph-main px-4 mb-0'>{`Your order number is: #${order.orderNumber}`}</p>
            <Row>
              <Col className='text-right px-0'>Pickup Name:</Col>
              <Col className='text-left'>{`${order.pickupName}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Pickup Time:</Col>
              <Col className='text-left'>{`${order.pickupTime}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Contact number:</Col>
              <Col className='text-left'>{`${order.phone}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Order Status:</Col>
              <Col className='text-left'>{`${order.status}`}</Col>
            </Row>
            <Row className='justify-content-center cart-checkout-success'>
              <header></header>
            </Row>
            {order &&
              order.items &&
              order.items.map((cartItem, idx) => (
                <Row
                  className='justify-content-start checkout-success-item'
                  key={idx}>
                  <CartItemCheckout
                    key={idx}
                    cartItem={cartItem}
                    refreshCart={refreshCart}
                  />
                </Row>
              ))}
            <Row className='justify-content-center cart-checkout-success'>
              <footer>
                <Col className='text-right px-0'>Total:</Col>
                <Col className='text-left'>{`${formatMoney(
                  order.totalInCents
                )}`}</Col>
              </footer>
            </Row>
          </div>
        ) : (
          <div className='u-center-text'>
            <h2 className='heading-secondary u-margin-bottom-small'>
              Sorry, We couldn't find your order
            </h2>
          </div>
        )}
      </section>
    </Container>
  )
}

export default CheckoutSuccess
CheckoutSuccess.getInitialProps = async ({ query }) => {
  const { orderId } = query

  return { orderId }
}
