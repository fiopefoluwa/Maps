import React from 'react'
import { Link } from 'react-router-dom'


 const Home = () => {
  return (
    <div>
          
          <div>Home</div>
          <Link to="/maps">
          <button>
            Go
          </button>
          </Link>

    </div>

  )
}

export default Home
