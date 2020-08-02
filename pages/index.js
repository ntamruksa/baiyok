import Head from 'next/head'
import Link from 'next/link'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <section className='section-aboutus'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Welcome to Bai Yok Modern Thai Cousine</h2>
      </div>
      <div className="row">
                    <div className="col-1-of-2">
                        <h3 className="heading-tertiary u-margin-bottom-small">You're going to fall in love</h3>
                        <p className="paragraph">Here at Bai Yok Modern Thai Cuisine in Castlecrag, we like to think we’re doing something a little bit different with the Thai canon. We look to traditional, but also try to provide something contemporary.</p>
                        <h3 className="heading-tertiary u-margin-bottom-small">Come and enjoy the best Thai food in Sydney.</h3>
                        <p className="paragraph">we combine spring rolls, classic soups, red and green curries and duck dishes with house favourites like Hoy Jor – crab, prawn, pork and water chestnut wrapped in soya paper and served with plum sauce – and Yum Ped Tod, duck with Lebanese cucumber, betel leaf and chilli lime dressing.</p>
                        <Link href='/menu'>
                          <a className="btn-text">See our meals &rarr;</a>
                        </Link>
                    </div>
                    <div className="col-1-of-2">
                        <div className="composition">
                          <img src="/baiyok-meang.jpg" alt="Photo 1" className="composition__photo composition__photo--p1"/>
                          <img src="/baiyok-fish.jpg" alt="Photo 2" className="composition__photo composition__photo--p2"/>
                          <img src="/baiyok-banana-blossom.jpg" alt="Photo 3" className="composition__photo composition__photo--p3"/>
                        </div>
                    </div>
      </div>
    </section>
  )
}
