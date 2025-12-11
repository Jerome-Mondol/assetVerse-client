import React from 'react'
import Navbar from '../../components/common/Navbar'
import Hero from '../../sections/Hero'
import About from '../../sections/About'
import Features from '../../sections/Features'
import Testimonials from '../../sections/Testimonials'
import Extra from '../../sections/Extra'

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <Extra />
    </>
  )
}

export default Home
