// import React from 'react'
import { Link } from "react-router-dom";
import '../Style/home.css'
import Road from '../assets/Road.jpeg'
import unilaglogo from '../assets/unilaglogo.png';
import Unilag from '../assets/unilag.jpg';


 const Home = () => {
  return (
    <main className='home-wrapper'>
        <img className='unilaglogo sm:translate-x-6' src={unilaglogo} alt="" />
        <div className='body'>
        <div>
            <h1 className='weclome text-2xl'>Welcome to <span className='highlight italic text-4xl font-extrabold'>Travel Muse.</span></h1>
            <p className='subtext text-sm'>Let's help you find your way around Unilag.</p>
            <Link to={'/maps'}>
            <button title='nextpage' type='submit' className='start translate-y-10'>Start your journey</button>
            </Link>
        </div>
        <div className="relative">
          <img src={Road} alt="Road" className="travel-img" />
          <img src={Unilag} alt="UNILAG" className="absolute inset-0 z-10 w-full  m-auto opacity-70 rounded-full" />
        </div>
        </div>
    </main>
  )
}

export default Home
