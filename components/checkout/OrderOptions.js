import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const ButtonStyles = styled.div`
  text-align: center;
  width: 100%;
  height: 7rem;
  margin-bottom: 2rem;
  cursor: pointer;
  :active {
    background-color: grey;
    color: white;
  }
`
const ButtonSubtitleStyle = styled.p`
  text-transform: none;
  font-style: italic;
  text-align: center;
  font-size: 1rem;
`

const OrderOptions = ({
  isPickup,
  isDelivery,
  selectPickup,
  selectDelivery,
}) => {
  return (
    <Row>
      <Col>
        <ButtonStyles
          className={`invert-theme-btn ${
            isPickup ? 'invert-theme-btn__selected' : ''
          }`}
          onClick={selectPickup}>
          Pickup
        </ButtonStyles>
      </Col>
      <Col>
        <ButtonStyles
          className={`invert-theme-btn ${
            isDelivery ? 'invert-theme-btn__selected' : ''
          }`}
          onClick={selectDelivery} >
          Delivery
          <ButtonSubtitleStyle>minimun order $25</ButtonSubtitleStyle>
        </ButtonStyles>
      </Col>
    </Row>
  )
}

export default OrderOptions
