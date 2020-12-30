import { Form, Container, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import api from '../services/API'
import CheckoutCart from '../components/cart/CheckoutCart'
import { getCart } from '../services/cart'
import formatMoney from '../services/formatMoney'
import CartItemCheckout from '../components/cart/CartItemCheckout'
// import styles from '../styles/Home.module.css'

export default function Checkout({ refreshCart }) {
  const [cart, setCart] = useState(getCart())

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pickupName, setPickupName] = useState('')
  const [phone, setPhone] = useState('')
  const [blockedTimeList, setBlockedTimeList] = useState({blockedTime: []})
  const [time, setTime] = useState(null)
  const timeList = [
    { id: 545, label: '5:45 pm' },
    { id: 600, label: '6:00 pm' },
    { id: 615, label: '6:15 pm' },
    { id: 630, label: '6:30 pm' },
    { id: 645, label: '6:45 pm' },
    { id: 700, label: '7:00 pm' },
    { id: 715, label: '7:15 pm' },
    { id: 730, label: '7:30 pm' },
    { id: 745, label: '7:45 pm' },
    { id: 800, label: '8:00 pm' },
    { id: 815, label: '8:15 pm' },
    { id: 830, label: '8:30 pm' },
    { id: 845, label: '8:45 pm' },
    { id: 900, label: '9:00 pm' },
    { id: 915, label: '9:15 pm' },
    { id: 930, label: '9:30 pm' }
  ]
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
                <Form.Label>
                  Pickup Time
                </Form.Label>
                <ToggleButtonGroup size="lg" className="m-2 flex-wrap" name="time" >
                  {timeList.map(t => {
                    if (blockedTimeList.blockedTime && blockedTimeList.blockedTime.includes(t.id)) {
                      return (<ToggleButton name="time" variant='outline-success' className="btn m-2 flex-grow-0" disabled value={t.label} key={t.label}>{t.label}</ToggleButton>)
                    } else {
                      return (
                        <ToggleButton name="time" variant='outline-success' className="btn m-2 flex-grow-0" onClick={handleTimeChange} value={t.label} key={t.label}>{t.label}</ToggleButton>
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
            <CheckoutCart cart={cart}>
              <button className='theme-btn mt-4'>Payment</button>
            </CheckoutCart>
          </Form>
        </div>
      </section>
    </Container>
  )
}
