import Image from 'next/image'
import { Inter } from 'next/font/google'
import {  Business, CardDeal,  CTA, Footer, Navbar, Stats,  Hero } from "../components";
import styles from "../styles/style";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
        {/* <Billing /> */}
        <CardDeal />
        {/* <Testimonials /> */}
        {/* <Clients /> */}
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
  )
}