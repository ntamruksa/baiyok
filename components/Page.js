import React, { Component,  useState} from 'react'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'
// import styled from 'styled-component'
const Page = (props) => {
  const [showCart, setShowCart] = useState(false)

  const hideCart = () => {
    setShowCart(false)
  }
  const toggleCart = () => {
    setShowCart(!showCart)
  }

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
        return React.cloneElement(child, { hideCart });
    }
    return child;
});

    return (
      <div>
        <Meta />
        <Header showCart={showCart} hideCart={hideCart} toggleCart={toggleCart}/>
        <div style={{ marginTop: '60px' }}>{childrenWithProps}</div>
        <Footer />
      </div>
    )

}

export default Page
