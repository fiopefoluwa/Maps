// import React from 'react'
import { Link } from "react-router-dom";
import '../Style/home.css'
import Road from '../assets/Road.jpeg'
import unilaglogo from '../assets/unilaglogo.png';


 const Home = () => {
  return (
    <main className='home-wrapper'>
        <img className='unilaglogo sm:translate-x-6' src={unilaglogo} alt="" />
        <div className='body'>
        <div>
            <h1 className='weclome text-2xl'>Welcome to <span className='highlight italic text-4xl font-extrabold'>Travel Muse.</span></h1>
            <p className='subtext'>Let's help you find your way around Unilag.</p>
            <Link to={'/maps'}>
            <button title='nextpage' type='submit' className='start'>Start your journey</button>
            </Link>
        </div>
        <div className='map-container'>
            <img className='travel-img' src={Road} alt="" />
        </div>
        </div>
    </main>
  )
}

export default Home
