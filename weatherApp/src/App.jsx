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

const WeatherDetails=({icon,temp,city,country,lat,log})=>{
    return (<>
      <div className="image">
        <img src={icon} alt="image" />
     </div>
     <div className="temp">{temp}°C</div>
     <div className="location">{city}</div>
     <div className="country">{country}</div>
     <div className="cord">
        <div>
          <span className="lat">lattitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
     </div>
    </>);
  };

function App() {

  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('Nagercoil');
  const [country, setCountry] =useState('IN');
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);

  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text" className="cityInput" placeholder="Search City"></input>
        <div>
          <img className="searchIcon"src={searchIcon} alt="searchicon"></img>
        </div>
      </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} />
    </div>
    </>
  )
}

export default App
