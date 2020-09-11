import { Form, Button, Container, FormControl } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import moment from 'moment'
import api from '../services/API'

export default function Book() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [optIn, setOptIn] = useState(false)
  const [party, setParty] = useState(2)
  const [showTime, setShowTime] = useState(false)
  const [note, setNote] = useState(undefined)
  const [isValid, setIsValid] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const validPhoneNumber = (n) => (n.toString().length === 10 && n.toString().substring(0, 2) === '04')
    if (date === null) {
      setIsValid(false)
      setErrorMessage(
        'Please select date'
      )
    } else if (time === null) {
      setIsValid(false)
      setErrorMessage(
        'Please select time'
      )
    } else if (!firstName) {
      setIsValid(false)
      setErrorMessage(
        'First Name is required'
      )
    } else if (!phone || !validPhoneNumber(phone)) {
      setIsValid(false)
      setErrorMessage(
        'Valid Phone Number is Required'
      )
    } else {
      setIsValid(true)
      setErrorMessage('')
    }
  }, [phone, date, time, firstName])

  const handleInputChange = (e) => {
    const value = e.target.value
    if (e.target.id === 'formBasicEmail') {
      setEmail(value)
    } else if (e.target.id === 'formFirstName') {
      setFirstName(value)
    } else if (e.target.id === 'formLastName') {
      setLastName(value)
    } else if (e.target.id === 'formPhone') {
      setPhone(value)
    } else if (e.target.id === 'formBasicOptIn') {
      setOptIn(e.target.checked)
    } else if (e.target.id === 'formParty') {
      setParty(value)
    } else if (e.target.id === 'formNote') {
      setNote(value)
    }
  }
  const handleDateChange = (e, { disabled }) => {
    setDate(e)
    setTime(null)
    disabled ? setShowTime(false) : setShowTime(true)
  }
  const handleSubmitForm = (e) => {
    e.preventDefault()
    setIsValid(false)
    setIsLoading(true)
    const reservation = {
      email,
      firstName,
      lastName,
      phone,
      optIn,
      party,
      date: moment(date).format('ddd DD MMM YYYY'),
      time: time.format('hh:mm A'),
      note
    }
    const text = `${party} persons on ${moment(date).format(
      'ddd DD MMM YYYY'
    )} ${time.format('hh:mm A')} Name: ${firstName} ${lastName} Phone: <tel:${phone}> ${note ? ', Special request: ' + note : ''}`
    const payload = {
      text,
      channel: 'baiyok-reservation'
    }
    fetch(process.env.NEXT_PUBLIC_SLACK_HOOK_URL, {
      method: 'post',
      body: JSON.stringify(payload)
    }).then((res) => {
      api.addBooking(reservation).then((bookingRes) => {
        setIsValid(true)
        setIsLoading(false)
        router.push({pathname: '/thankyou-booking', query: { bookingId: bookingRes.insertedId }})
      }).catch((err) => {
        console.error(err)
        setErrorMessage(err.message)
        setIsLoading(false)
        setIsValid(true)
      })
    }).catch((err) => {
      console.error(err)
      setErrorMessage(err.message)
      setIsLoading(false)
      setIsValid(true)
    })
  }
  const monday = {
    daysOfWeek: [1]
  }
  const past = {
    before: new Date()
  }
  const disabledMinutes = (h) => {
    const currentHour = parseInt(moment().format('HH'))
    const currentMinutesRestriction = moment().format('mm')
    const currentHourRestrictedMinutes = []
    if (h === currentHour) {
      for (let i = 0; i < parseInt(currentMinutesRestriction); i++) {
        currentHourRestrictedMinutes.push(i)
      }
    }

    if (h === 17) {
      currentHourRestrictedMinutes.push(0)
      currentHourRestrictedMinutes.push(15)
    }
    switch (h) {
      case 17:
        return currentHourRestrictedMinutes
      case currentHour:
        return currentHourRestrictedMinutes
      default:
        return []
    }
    // return []
  }

  const disabledHours = () => {
    const hours = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      22,
      23
    ]
    const now = moment().format('HH')
    for (let i = 0; i < parseInt(now); i++) {
      if (!hours.includes(i)) hours.push(i)
    }
    return hours
  }
  return (
    <Container>
      <section className='section-book'>
        <div className='u-center-text u-margin-bottom-med'>
          <h2 className='heading-secondary u-margin-bottom-small'>
            Book a table
          </h2>
        </div>
        <div className='section-covid__form form-container u-margin-bottom-big'>
          <Form className='form'>
            <Form.Group controlId='formParty' className='u-margin-bottom-med'>
              <Form.Label>Party Size</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='number'
                defaultValue='2'
                onChange={handleInputChange}
                value={party}
                as='select'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId='formDate'
              className='u-margin-bottom-med text-center'>
              {/* <Form.Label>Select Date</Form.Label> */}
              <DayPicker
                selected={date}
                onDayClick={handleDateChange}
                value={date}
                disabledDays={[monday, past]}
              />
            </Form.Group>
            {showTime && (
              <Form.Group>
                <Form.Label>
                  Select time for {moment(date).format('DD MMM YYYY')}
                </Form.Label>
                <TimePicker
                  className='form-control'
                  showSecond={false}
                  onChange={setTime}
                  format='HH:mm'
                  inputReadOnly
                  value={time}
                  allowEmpty={false}
                  disabledHours={disabledHours}
                  disabledMinutes={disabledMinutes}
                  minuteStep={15}
                />
              </Form.Group>
            )}
            <Form.Group
              controlId='formFirstName'
              className='u-margin-bottom-med'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='text'
                onChange={handleInputChange}
                value={firstName}
                required
              />
            </Form.Group>
            <Form.Group
              controlId='formLastName'
              className='u-margin-bottom-med'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='text'
                onChange={handleInputChange}
                value={lastName}
              />
            </Form.Group>
            <Form.Group controlId='formPhone' className='u-margin-bottom-med'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='number'
                onChange={handleInputChange}
                value={phone}
                required
              />
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
            <Form.Group
              controlId='formNote'
              className='u-margin-bottom-med'>
              <Form.Label>Special Request</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='text'
                onChange={handleInputChange}
                value={note}
              />
            </Form.Group>
            <Form.Group
              controlId='formBasicOptIn'
              className='u-margin-bottom-med'>
              <Form.Check
                className='form-checkbox paragraph'
                type='checkbox'
                label={`I'd like to receive marketing communications from this venue`}
                onClick={handleInputChange}
              />
            </Form.Group>
            {errorMessage && (
                    <div className="mt-4 alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
            <Button
              className='btn-lg'
              variant='outline-secondary'
              onClick={handleSubmitForm}
              disabled={!isValid}>
              Submit
            </Button>
          </Form>
        </div>
      </section>
    </Container>
  )
}
