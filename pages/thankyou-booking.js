import { withRouter } from "next/router";

import {
  Container
} from 'react-bootstrap'
// import styles from '../styles/Home.module.css'

const ThankyouBooking = withRouter(({ router: { query: { confirm } } }) => (
  <Container>
      <section className='section-thankyou'>
        <div className='u-center-text u-margin-bottom-big'>
          <h2 className='heading-secondary u-margin-bottom-small'>
            Thank you for booking.
          </h2>
          <p className='paragraph-main px-4'>
            Your reservation details is: <br/>{confirm}
          </p>
          <p className='paragraph-main px-4'>
            If any change please contact us on <br/><a href="tel:99673433">9967 3433</a> or  <a href="tel:99673411">9967 3411</a>. <br/>We are looking forward to see you
          </p>
        </div>
      </section>
    </Container>
));

export default ThankyouBooking