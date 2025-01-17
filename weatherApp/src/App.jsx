import { useEffect, useState } from 'react'
import './App.css'

import searchIcon from './assets/search.png'
import clearIcon from './assets/clear.png'
import cloudIcon from './assets/cloud.png'
import drizzleIcon from './assets/drizzle.png'
import rainIcon from './assets/rain.png'
import windIcon from './assets/wind.png'
import snowIcon from './assets/snow.png'
import humidityIcon from './assets/humidity.png'

const WeatherDetails=({icon,temp,city,country,lat,log,humid,wind})=>{
    return (
    <>
      <div className="weatherImage">
        <img className="image" src={icon} alt="image" />
     </div>
     <div className="temp">{temp}°C</div>
     <div className="location">{city}</div>
     <div className="country">{country}</div>

     <div className="cord">
        <div>
          <span className="lat">lattitude</span>
          <span >{lat}</span>
        </div>
        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
     </div>

     <div className="data-Container">
       <div className="element">
          <img src={humidityIcon} alt="humidity" class="icon"/>
            <div className="data">
            <div className="hum-per">{humid}%</div>
            <div className="text">Humidity</div>
        </div>
        </div>

       <div className="element">
            <img src={windIcon} alt="humidity" class="icon"/>
             <div className="data">
             <div className="wind-per">{wind} km/hr</div>
             <div className="text">Wind Speed</div>
          </div>

         </div>
      </div>
    </>);
  };

function App() {
  let api_key="328417d6d22a738328ab1909d4fb8ed8";

  const [text,setText]= useState("Nagercoil");

  const [icon, setIcon] = useState(cloudIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('');
  const [country, setCountry] =useState('IN');
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humid, setHumid]= useState(0);
  const [wind, setWind]= useState(0);

  const [cityNotFound, setCityNotFound]=useState(false);
  const [loading, setLoading]= useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    };

  const search =async ()=>{
  setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
  
    try{
      let res = await fetch(url);         
      let data = await res.json();         
      if(data.cod === "404")           
        {           
          console.error('City Not Found');           
          setCityNotFound(true);           
          setLoading(false);           
          return;         
        }                  
        setHumid(data.main.humidity);         
        setWind(data.wind.speed);         
        setTemp(Math.floor(data.main.temp));         
        setCity(data.name);         
        setCountry(data.sys.country);         
        setLat(data.coord.lat);         
        setLog(data.coord.lon);

        const weatherIconCd=data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCd] || clearIcon);
        setCityNotFound(false);
    }
    catch(error){
      console.error('An error occured:',error.message);
      setError('An error occured while fetching weather data.');
    }
    finally{
      setLoading(false);
    }
  };

  const handleCity =(e)=>{
    setText(e.target.value);
  };
  
  const handleKeyDown =(e)=>{
    if(e.key ==="Enter"){
      search();
    }
  };
  
  useEffect(function () {
    search();
  },[]);

  return (
    <>
    <div className="container">
      <div className="input-container">

        <input type="text" className="cityInput" placeholder="Search City" 
        onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>

        <div>
          <img className="searchIcon"src={searchIcon} alt="searchicon" onClick={()=>search()}/>
        </div>

      </div>
        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humid={humid} wind={wind}/>}
        
        {loading && <div className="loadingMsg">Loading...</div>} 
        {error && <div className="errorMsg">{error}</div>}
        {cityNotFound && <div className="cityNotFoundMsg">City not found</div>}

        
        <p className="copyright">Designed by
          <span> Manishmellow</span>
        </p>
    </div>
    </>
  )
}

export default App
