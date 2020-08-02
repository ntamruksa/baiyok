import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'
// import styled from 'styled-component'

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
        {/* <Footer /> */}
      </div>
    )
  }
}

export default Page
