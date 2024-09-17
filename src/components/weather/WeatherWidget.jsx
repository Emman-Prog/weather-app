import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MoonSvg from '../../assets/svgs/dark_mode.svg?react'
import CloudSvg from '../../assets/svgs/cloud.svg?react'
import SunSvg from '../../assets/svgs/sunny.svg?react'
import './weather.css'


const WeatherWidget = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2e2357f674dc2ae49073e72fa08d8c3a&units=metric`)
      .then(res => {
        setWeatherData(res.data)
      })
      .catch(error => {
        console.log("Error: ", error);
      })
  }, [location])

  const currentTimeUTC = Math.floor(new Date().getTime() / 1000)
  const localTime = currentTimeUTC + weatherData?.timezone
  const isDayTime = localTime > weatherData?.sys?.sunrise && localTime < weatherData?.sys?.sunset
  const cloudSize = weatherData?.clouds?.all


  return (
    <>
      <div className="weather-widget">
        {isDayTime ? <SunSvg className="sun" /> : <MoonSvg className="moon" />}
        <div className="cloud-container">
          {cloudSize > 50 && <CloudSvg className="cloud" />}
        </div>
        <div className="temperature">{Math.round(weatherData?.main?.temp)}&deg;</div>
        <div className="weather">{weatherData?.weather[0]?.main}</div>
        <div className="low-high">{Math.round(weatherData?.main?.temp_min)}&deg; / {Math.round(weatherData?.main?.temp_max)}&deg;</div>
        <div className="feels-like">Feels like: {Math.round(weatherData?.main?.feels_like)}&deg;</div>
        <div className="location">{weatherData?.name}</div>
        <div className="humidity">Humidity: {Math.round(weatherData?.main?.humidity)}</div>
      </div>
    </>
  )
}

export default WeatherWidget