import Link from 'next/link'
import React, { useState } from 'react'
import { Navbar, Nav, Container, Image } from 'react-bootstrap'
import Icon from './common/FontAwesome'
import { getCart } from '../services/cart'

const NavPage = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const closeMenu = () => {
    setIsNavExpanded(false)
  }

  return (
    <div>
      <Navbar
        onToggle={setIsNavExpanded}
        expanded={isNavExpanded}
        color='light'
        expand='lg'
        className='navbar-light site-nav shadow-sm fixed-top'
        id='site-navbar'>
        <Container>
          <Navbar.Brand to='/'>
            <Nav.Link eventKey={0} as={Link} activeclassname='active' href='/'>
              <Image
                src='/Logo-Baiyok-small.png'
                alt=''
                className='site-nav--logo'
              />
            </Nav.Link>
          </Navbar.Brand>
          <Link
            href='/checkout'
            className='navbar-toggler navbar-toggler--cart'
            style={{
              background: 'transparent',
              borderColor: 'transparent',
              color: '#F27A25'
            }}>
            <Icon icon='shopping-basket' size='2x' />
          </Link>
          <Navbar.Toggle className='hamburgerbar' />
          <Navbar.Collapse id='navbarNavDropdown'>
            <Nav activeKey={1} className='ml-auto' onSelect={closeMenu}>
              <Link href='/' passHref>
                <Nav.Link activeclassname='active'>Home</Nav.Link>
              </Link>
              <Link href='/menu' passHref>
                <Nav.Link activeclassname='active'>Menu</Nav.Link>
              </Link>
              <Link href='/book' passHref>
                <Nav.Link activeclassname='active'>Reservation</Nav.Link>
              </Link>{' '}
              <a target="_blank" href='https://www.menulog.com.au/order/baiyok-modern-thai-cuisine'>
                <Nav.Link activeclassname='active' target="_blank" href='https://www.menulog.com.au/order/baiyok-modern-thai-cuisine' >Menulog Order</Nav.Link>
              </a>
              <Link href='/#section-contactus' passHref>
                <Nav.Link activeclassname='active'>Contact</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavPage
