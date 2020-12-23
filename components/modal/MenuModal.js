import React, { useState, useEffect } from 'react'
import { Form, Modal, Row, Col } from 'react-bootstrap'
import { addItemToCart } from '../../services/cart'
const MenuModal = ({ show, onHide, item }) => {
  const [itemTotalPriceInCents, setItemTotalPriceInCents] = useState(
    item.priceInCents
  )

  const [option, setOption] = useState({})
  const [validOption, setValidOption] = useState(true)

  const selectOption = (index) => {
    const basePrice = item.priceInCents
    const optionPrice = item.options[index].priceInCents | 0
    setOption({title: item.options[index].title, priceInCents: optionPrice})
    setItemTotalPriceInCents(basePrice + optionPrice)
  }

  const addItem = (e, hide) => {
    e.preventDefault()
    addItemToCart(item, itemTotalPriceInCents, option, 'test', quantity)
    hide()
  }

  const [quantity, setQuantity] = useState(1)

  const addQuantity = (e) => {
    e.preventDefault()
    setQuantity(quantity + 1)
  }

  const removeQuantity = (e) => {
    e.preventDefault()
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  useEffect(() => {
    if (item.options && !option.title) {
      setValidOption(false)
    } else {
      setValidOption(true)
    }
  }, [option])

  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header closeButton={true}></Modal.Header>
      <div>
        {item.image && (
          <img src={item.image} alt='Menu Preview' className='menu-photo' />
        )}
      </div>
      <Modal.Body>
        <Form>
          <h1 className='text-capitalize p-4 menu-modal-title'>{item.title}</h1>
          <p className='text-gray mb-0 p-4 menu-modal-subtitle'>
            {item.subtitle &&
              (item.subtitle.charAt(item.subtitle.length - 1) === '.'
                ? item.subtitle.substring(0, item.subtitle.length - 1)
                : item.subtitle)}
          </p>
          {item.options && (
            <>
              <div className='menu-modal-option-header'>
                <div className='menu-modal-option-header-title'>
                  Choice of Preparation
                </div>
                <div className='menu-modal-option-header-subtitle'>
                  Choose One
                </div>
              </div>
              <div className='menu-modal-option-body'>
                {item.options.map((option, index) => (
                  <Row className='py-2' key={index}>
                    <Col className='menu-modal-option-body-title col-auto'>
                      <Form.Check
                        type='radio'
                        label={option.title}
                        name='menuOption'
                        key={index}
                        id={`menuOption-${index}`}
                        className='menu-modal-option-body-title-inner'
                        onClick={() => selectOption(index)}
                      />
                    </Col>
                    <Col className='menu-modal-option-body-price'>
                      {option.priceInCents > 0 ? `+${(option.priceInCents / 100).toFixed(2)}` : ''}
                    </Col>
                  </Row>
                ))}
              </div>
            </>
          )}
          <Row >
            <Col sm={3}>
              <div className='qty-btn'>
                <button
                  className='round-btn ml-4'
                  onClick={(e) => removeQuantity(e)}>
                  &minus;
                </button>
                <div className='mb-0 mt-2 p-4'>{quantity}</div>
                <button
                  className='round-btn mr-4'
                  onClick={(e) => addQuantity(e)}>
                  &#43;
                </button>
              </div>
            </Col>
            <Col>
              <button
                className='theme-btn full-width-btn mb-0 p-4'
                onClick={(e) => addItem(e, onHide)} disabled={!validOption}>
                {`add ${quantity} to order`}
              </button>
            </Col>
            <Col sm={2}>
              <div className='invert-theme-btn mb-0 p-4'>
                ${(itemTotalPriceInCents * quantity/ 100).toFixed(2)}
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default MenuModal
