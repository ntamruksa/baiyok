import Link from 'next/link'
import { Container } from 'react-bootstrap'

// import styles from '../styles/Home.module.css'

export default function Thankyou() {
  return (
    <Container>
      <section className='section-thankyou'>
        <div className='u-center-text u-margin-bottom-big'>
          <h2 className='heading-secondary u-margin-bottom-small'>
            Thank you.
          </h2>
          <p className='paragraph-main px-4'>
            We appreciate your work and your cooperation towards helping our
            community fight against COVID-19
          </p>
          <Link href='/menu'>
            <a className='btn-text'>See our meals &rarr;</a>
          </Link>
        </div>
      </section>
    </Container>
  )
}
