// src/pages/HomePage/HomePage.jsx
import { useEffect, useState } from 'react' // Add useState, useEffect
import CTASection from './components/CTASection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import NearbyRestaurants from './components/NearbyRestaurants' // <-- Import Nearby
import RestaurantShowcase from './components/RestaurantShowcase'
import './CSS/HomePage.css'

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // <-- State for login status

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token) // Set to true if token exists, false otherwise
  }, [])

  return (
    <div className='homepage-container'>
      <Header />
      <HeroSection />
      <FeaturesSection />
      {/* 👇 Conditionally render NearbyRestaurants 👇 */}
      {isLoggedIn && <NearbyRestaurants />}
      <RestaurantShowcase /> {/* Featured restaurants always show */}
      <CTASection />
      <Footer />
    </div>
  )
}

export default HomePage
