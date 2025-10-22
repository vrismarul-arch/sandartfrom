import React from 'react'
import LockPointNavbar from '../../components/LockPointNavbar'
import HeroBanner from './HeroBanner'
import AboutUsSection from './AboutUsSection'
import OurServices from './OurServices'
import ContactInfo from '../../components/ContactInfo'
import PartnerSlider from './logoslider/PartnerSlider'
import HowItWorks from './HowItWorks'
import WhoWeServe from '../whowe/WhoWeServe'
import Footer from '../../components/Footer'

const Masterpage = () => {
  return (
    <div className='master'>
            <ContactInfo/>

      <LockPointNavbar/>
      <HeroBanner style={{ minHeight: '80vh' }}/>
      <AboutUsSection/>
      <OurServices/>

      <PartnerSlider/>
      <HowItWorks/>
      <WhoWeServe/>
      <Footer/>
    </div>
  )
}

export default Masterpage