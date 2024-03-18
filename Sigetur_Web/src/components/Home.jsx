import React from 'react'

import Cuerpo from './cuerpo'
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
     <div>
      <NavBar />
    </div>
    <div>
      <Cuerpo />
    </div>
  </div>
  )
}

export default Home