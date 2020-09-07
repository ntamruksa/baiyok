import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, Container } from 'react-bootstrap'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Container>
      <section className='section section-hero' />
      <section className='section section-aboutus'>
        <div className='u-center-text u-margin-bottom-med'>
          <h2 className='heading-secondary mx-4'>
            Welcome to Bai Yok Modern Thai Cousine
          </h2>
        </div>
        <Row className="mx-4">
          <Col sm={6} xs={12} className="my-4">
            {/* <h3 className='heading-tertiary u-margin-bottom-small'>
              You're going to fall in love
            </h3> */}
            <p className='paragraph'>
              Our first Bai Yok Thai Restaurant began its journey in 1988 at Crown Nest as family business run by Chan, Yoksri and me (Michael).
              Bai Yok is named after Yoksri, who is my dear sister and the creator of all the recipes.
              Yok means 'Jade' in English.
            </p>
            {/* <h3 className='heading-tertiary u-margin-bottom-small'>
              Come and enjoy the best Thai food in Sydney.
            </h3> */}
            <p className='paragraph'>
              In 2001, our family established Bai Yok Castlecrag with an aim to become part of the Castlecrag community.
              Since then we have been creating quality authentic Thai food, just as we would do for our own family.
              We can always recall our opening night and especially the first couple that stepped into our restaurant,
              They have not just become our regular customer, but also part of our extended Castlecrag family.
            </p>
            <p className='paragraph'>
              Due to the community support and patronage, Bai Yok Castlecrag has now been operating over 19 years.
              We appreciate the community that see us as the go to "dining venue" and will continue to deliver exciting,
              quality authentic Thai cuisine at Bai Yok Castlecrag.
            </p>
            <p className='paragraph'>
              Thank so much for your continuing support. <br/>Michael Lui and Family
            </p>
            <Link href='/menu'>
              <a className='btn-text'>See our meals &rarr;</a>
            </Link>
          </Col>
          <Col sm={6} xs={12} className="my-4">
            <div className='composition'>
              <img
                src='/baiyok-meang.jpg'
                alt='Photo 1'
                className='composition__photo composition__photo--p1'
              />
              <img
                src='/baiyok-fish.jpg'
                alt='Photo 2'
                className='composition__photo composition__photo--p2'
              />
              <img
                src='/baiyok-banana-blossom.jpg'
                alt='Photo 3'
                className='composition__photo composition__photo--p3'
              />
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
