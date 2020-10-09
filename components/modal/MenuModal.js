import React from 'react'
import { Form, Modal } from 'react-bootstrap'

const MenuModal = ({ show, onHide, item }) => {
  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header closeButton={true}>
        <Modal.Title as='h3' id='item-title' className='text-capitalize'>
          {item.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div>{item.image && <img src={item.image} alt='Menu Preview' />}</div>
          <p className='text-gray mb-0'>
            {item.subtitle &&
              (item.subtitle.charAt(item.subtitle.length - 1) === '.'
                ? item.subtitle.substring(0, item.subtitle.length - 1)
                : item.subtitle)}
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default MenuModal
