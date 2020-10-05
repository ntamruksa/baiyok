import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, Container, Carousel } from 'react-bootstrap'
import ContactCard from '../components/home/ContactCard'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Container>
        <section className='section section-hero' />
        {/* <section className='section section-meals'></section> */}
        <section className='section section-carousel'>
          <Carousel>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='/baiyok-meang.jpg'
                alt='First slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='/baiyok-fish.jpg'
                alt='Third slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='/baiyok-banana-blossom.jpg'
                alt='Third slide'
              />
            </Carousel.Item>
          </Carousel>
        </section>
        <section className='section section-aboutus'>
          <div className='u-center-text u-margin-bottom-med'>
            <h2 className='heading-secondary mx-4'>
              Welcome to Bai Yok Modern Thai Cousine
            </h2>
          </div>
          <Row className='mx-4'>
            <Col sm={6} xs={12} className='my-4'>
              {/* <h3 className='heading-tertiary u-margin-bottom-small'>
              You're going to fall in love
            </h3> */}
              <p className='paragraph'>
                Our first Bai Yok Thai Restaurant began its journey in 1988 at
                Crown Nest as family business run by Chan, Yoksri and me
                (Michael). Bai Yok is named after Yoksri, who is my dear sister
                and the creator of all the recipes. Yok means 'Jade' in English.
              </p>
              {/* <h3 className='heading-tertiary u-margin-bottom-small'>
              Come and enjoy the best Thai food in Sydney.
            </h3> */}
              <p className='paragraph'>
                In 2001, our family established Bai Yok Castlecrag with an aim
                to become part of the Castlecrag community. Since then we have
                been creating quality authentic Thai food, just as we would do
                for our own family. We can always recall our opening night and
                especially the first couple that stepped into our restaurant,
                They have not just become our regular customer, but also part of
                our extended Castlecrag family.
              </p>
              <p className='paragraph'>
                Due to the community support and patronage, Bai Yok Castlecrag
                has now been operating over 19 years. We appreciate the
                community that see us as the go to "dining venue" and will
                continue to deliver exciting, quality authentic Thai cuisine at
                Bai Yok Castlecrag.
              </p>
              <p className='paragraph'>
                Thank so much for your continuing support. <br />
                Michael Lui and Family
              </p>
              <Link href='/menu'>
                <a className='btn-text'>See our meals &rarr;</a>
              </Link>
            </Col>
            <Col sm={6} xs={12} className='my-4'>
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
      <section className='section-contactus' name="section-contactus">
        <div className='u-center-text u-margin-bottom-small'>
          <h2 className='heading-secondary mx-4'>Contact us</h2>
        </div>
        <Row className='align-items-top'>
          <Col md={4} xs={12} className='section-contactus__box'>
            <div className='section-contactus__title'>address</div>
            <div className='section-contactus__details'>
              Shop2A, 122 Edinburgh Rd. Castlecrag, NSW 2068
            </div>
          </Col>
          <Col md={4} xs={12} className='section-contactus__box'>
            <div className='section-contactus__title'>Phone + Email</div>
            <div className='section-contactus__details'>
              (02) 9967 3433, (02) 9967 3411 <a href='mailto:baiyokcastlecrag@gmail.com'>baiyokcastlecrag@gmail.com</a>
            </div>
          </Col>
          <Col md={4} xs={12} className='section-contactus__box'>
            <div className='section-contactus__title'>Opening hours</div>
            <div className='section-contactus__details'>
              <div>Tuesday – Thursday: 5.30pm – 9:30pm</div>
              <div>Friday - Saturday: 5:30pm - 7:30pm and 7:30pm - 9:30pm</div>
              <div>Sunday: 5.30pm – 9:30pm</div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  )
}
