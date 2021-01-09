import {
  Form,
  Container,
  FormControl,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import api from '../services/API'
import CheckoutCart from '../components/cart/CheckoutCart'
import { getCart } from '../services/cart'
import formatMoney from '../services/formatMoney'
import CartItemCheckout from '../components/cart/CartItemCheckout'
// import styles from '../styles/Home.module.css'

export default function Checkout({ refreshCart }) {
  const [cart, setCart] = useState(getCart())
  const [errorMessage, setErrorMessage] = useState(null)

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pickupName, setPickupName] = useState('')
  const [phone, setPhone] = useState('')
  const [blockedTimeList, setBlockedTimeList] = useState({ blockedTime: [] })
  const [time, setTime] = useState(null)
  const availableTime = Number(
    moment().add(20, 'minutes').hours().toString() +
      moment().add(20, 'minutes').minutes().toString()
  )
  const timeList = [
    { id: 600, label: '6:00 pm', value: 1800 },
    { id: 615, label: '6:15 pm', value: 1815 },
    { id: 630, label: '6:30 pm', value: 1830 },
    { id: 645, label: '6:45 pm', value: 1845 },
    { id: 700, label: '7:00 pm', value: 1900 },
    { id: 715, label: '7:15 pm', value: 1915 },
    { id: 730, label: '7:30 pm', value: 1930 },
    { id: 745, label: '7:45 pm', value: 1945 },
    { id: 800, label: '8:00 pm', value: 2000 },
    { id: 815, label: '8:15 pm', value: 2015 },
    { id: 830, label: '8:30 pm', value: 2030 },
    { id: 845, label: '8:45 pm', value: 2045 },
    { id: 900, label: '9:00 pm', value: 2100 },
    { id: 915, label: '9:15 pm', value: 2115 },
    { id: 930, label: '9:30 pm', value: 2130 }
  ]
  const [isValid, setIsValid] = useState(null)
  useEffect(() => {
    const validPhoneNumber = (n) =>
      n.toString().length === 10 && n.toString().substring(0, 2) === '04'
    if (!pickupName) {
      setIsValid(false)
      setErrorMessage('Pickup Name is required')
    } else if (time === null) {
      setIsValid(false)
      setErrorMessage('Please select Pickup Time')
    } else if (!email) {
      setIsValid(false)
      setErrorMessage('Email is required')
    } else if (!phone || !validPhoneNumber(phone)) {
      setIsValid(false)
      setErrorMessage('Valid Phone Number is Required')
    } else {
      setIsValid(true)
      setErrorMessage('')
    }
  }, [phone, email, time, pickupName])
  const handleInputChange = (e) => {
    const value = e.target.value
    if (e.target.id === 'formBasicEmail') {
      setCart({ ...cart, email: value })
      setEmail(value)
    } else if (e.target.id === 'formPickupName') {
      setCart({ ...cart, pickupName: value })
      setPickupName(value)
    } else if (e.target.id === 'formPhone') {
      setCart({ ...cart, phone: value })
      setPhone(value)
    }
  }

  const handleTimeChange = (e) => {
    setTime(e.target.value)
    setCart({ ...cart, pickupTime: e.target.value })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const data = { email, pickupName, phone, date: new Date() }
    const payload = { text: JSON.stringify(data) }
    // fetch(process.env.NEXT_PUBLIC_SLACK_HOOK_URL, {
    //   method: 'post',
    //   body: JSON.stringify(payload)
    // }).then((res) => {
    api
      .checkin(data)
      .then((res) => {
        router.push('/thankyou')
      })
      .catch((err) => {
        console.error(err)
        setErrorMessage(err.message)
        router.push('/thankyou')
      })
    // })
  }
  return (
    <Container>
      <section className='section-covid'>
        <div className='u-center-text'>
          <h2 className='heading-secondary '>Checkout</h2>
        </div>
        <div className='section-covid__form form-container'>
          <Form className='form'>
            <Form.Group
              controlId='formPickupName'
              className='u-margin-bottom-med'>
              <Form.Label>Pickup Name</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='text'
                onChange={handleInputChange}
                value={pickupName}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pickup Time</Form.Label>
              <ToggleButtonGroup
                size='lg'
                className='m-2 flex-wrap'
                name='time'>
                {timeList.map((t) => {
                  if (
                    blockedTimeList.blockedTime &&
                    blockedTimeList.blockedTime.includes(t.id)
                  ) {
                    return (
                      <ToggleButton
                        name='time'
                        variant='outline-dark'
                        className='btn m-2 flex-grow-0'
                        disabled
                        value={t.label}
                        key={t.label}>
                        {t.label}
                      </ToggleButton>
                    )
                  } else if (t.value < availableTime) {
                    return (
                      <ToggleButton
                        name='time'
                        variant='outline-dark'
                        className='btn m-2 flex-grow-0'
                        disabled
                        value={t.label}
                        key={t.label}>
                        {t.label}
                      </ToggleButton>
                    )
                  } else {
                    return (
                      <ToggleButton
                        name='time'
                        variant='outline-success'
                        className='btn m-2 flex-grow-0'
                        onClick={handleTimeChange}
                        value={t.label}
                        key={t.label}>
                        {t.label}
                      </ToggleButton>
                    )
                  }
                })}
              </ToggleButtonGroup>
            </Form.Group>
            <Form.Group
              controlId='formBasicEmail'
              className='u-margin-bottom-med'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='email'
                onChange={handleInputChange}
                value={email}
              />
            </Form.Group>
            <Form.Group controlId='formPhone' className='u-margin-bottom-med'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='number'
                onChange={handleInputChange}
                value={phone}
              />
            </Form.Group>
            <div className='cart-checkout'>
              <header>
                <h2>Your order</h2>
              </header>
              <ul>
                {cart &&
                  cart.items.map((cartItem, idx) => (
                    <CartItemCheckout
                      key={idx}
                      cartItem={cartItem}
                      refreshCart={refreshCart}
                    />
                  ))}
              </ul>
              <footer>
                <h2>TOTAL {cart && formatMoney(cart.cartSubTotal)}</h2>
                {/* <CheckoutCart cart={cart}>
            <button className='theme-btn'>Checkout</button>
          </CheckoutCart> */}
              </footer>
            </div>
            {/* <Button
              className="btn-lg"
              variant="outline-secondary"
              onClick={handleSubmitForm}>
              Submit
            </Button> */}
            {errorMessage && (
              <div className='mt-4 alert alert-danger' role='alert'>
                {errorMessage}
              </div>
            )}
            <CheckoutCart cart={cart} isValid={isValid}>
              <button className='theme-btn mt-4' disabled={!isValid}>Payment</button>
            </CheckoutCart>
          </Form>
        </div>
      </section>
    </Container>
  )
}
