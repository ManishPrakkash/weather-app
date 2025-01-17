import { useState } from 'react'
import './App.css'

import searchIcon from './assets/search.png'
import clearIcon from './assets/clear.png'
import cloudIcon from './assets/cloud.png'
import drizzleIcon from './assets/drizzle.png'
import rainIcon from './assets/rain.png'
import windIcon from './assets/wind.png'
import snowIcon from './assets/snow.png'
import humidityIcon from './assets/humidity.png'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text" className="cityInput" placeholder="Search City"></input>
        <div>
          <img src={searchIcon} alt="searchicon"></img>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
