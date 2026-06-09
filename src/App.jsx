import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Users from './components/Users'
import Footer from './components/Footer'
import HeroSwiper from './components/MainSwiper'
import Home from './pages/Home'
import Cars from './pages/Cars'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<><HeroSwiper /><Home /></>} />
        <Route path="/cars" element={<><HeroSwiper /><Cars /></>} />
        <Route path="/category/:id" element={<><HeroSwiper /><Home /></>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      <Users />
      <Footer />
    </div>
  )
}

export default App