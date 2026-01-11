import React from 'react'
import Navbar from '../../components/common/Navbar'
import Hero from '../../sections/Hero'
import About from '../../sections/About'
import Features from '../../sections/Features'
import Testimonials from '../../sections/Testimonials'
import Extra from '../../sections/Extra'
import AnimatedAsset from '../../components/common/AnimatedAsset'
import Statistics from '../../sections/Statistics'
import Newsletter from '../../sections/Newsletter'
import FAQ from '../../sections/FAQ'
import CallToAction from '../../sections/CallToAction'
import Blog from '../../sections/Blog'
import Highlights from '../../sections/Highlights'
import Pricing from '../../sections/Pricing'

const Home = () => {
  return (
    <>
      <AnimatedAsset />
      <Hero />
      <Highlights />
      <Features />
      <Statistics />
      <About />
      <Pricing />
      <Testimonials />
      <Blog />
      <Newsletter />
      <FAQ />
      <CallToAction />
      <Extra />
    </>
  )
}

export default Home
