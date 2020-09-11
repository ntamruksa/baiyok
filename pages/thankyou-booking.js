import { withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import api from '../services/API'

// import styles from '../styles/Home.module.css'

const ThankyouBooking = withRouter(
  ({
    router: {
      query: { bookingId }
    }
  }) => {
    const [reservation, setReservation] = useState({})
    useEffect(() => {
      console.log('load menu')
      async function fetchData() {
        const response = await api.getBooking(bookingId)
        setReservation(response)
      }
      fetchData()
    }, [])

    return (
      <Container>
        <section className='section-thankyou'>
          <div className='u-center-text u-margin-bottom-big'>
            <h2 className='heading-secondary u-margin-bottom-small'>
              Thank you for booking.
            </h2>
            <p className='paragraph-main px-4'>
              Your reservation details is:
            </p>
            <Row>
              <Col className='text-right px-0'>Name:</Col>
              <Col className='text-left'>{`${reservation.firstName} ${reservation.lastName}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Date:</Col>
              <Col className='text-left'>{`${reservation.date}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Time:</Col>
              <Col className='text-left'>{`${reservation.time}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Party of:</Col>
              <Col className='text-left'>{`${reservation.party}`}</Col>
            </Row>
            <Row>
              <Col className='text-right px-0'>Contact number:</Col>
              <Col className='text-left'>{`${reservation.phone}`}</Col>
            </Row>
            <p className='paragraph-main p-4'>
              If any change please contact us on <br />
              <a href='tel:99673433'>9967 3433</a> or{' '}
              <a href='tel:99673411'>9967 3411</a>. <br />
              We are looking forward to see you
            </p>
          </div>
        </section>
      </Container>
    )
  }
)

export default ThankyouBooking
