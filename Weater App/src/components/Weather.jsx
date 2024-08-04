import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_Logo from '../assets/search.png';
import clear_Logo from '../assets/clear.png';
import cloud_Logo from '../assets/cloud.png';
import drizzle_Logo from '../assets/drizzle.png';
import humidity_Logo from '../assets/humidity.png';
import rain_Logo from '../assets/rain.png';
import snow_Logo from '../assets/snow.png';
import wind_Logo from '../assets/wind.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: '',
    icon: '',
  });

  const allIcon = {
    "01d": clear_Logo,
    "01n": clear_Logo,
    "02d": cloud_Logo,
    "02n": cloud_Logo,
    "03d": cloud_Logo,
    "03n": cloud_Logo,
    "04d": drizzle_Logo,
    "04n": drizzle_Logo,
    "09d": rain_Logo,
    "09n": rain_Logo,
    "10d": rain_Logo,
    "10n": rain_Logo,
    "13d": snow_Logo,
    "13n": snow_Logo,
  };
  const inputRef = useRef();

  const search = async (city) => {
    if (city === '') {
      alert('Please enter a city name to search for weather.'); // Clear and informative alert message
      return; // Exit the function early to prevent unnecessary API calls
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message)
        return
      }

      const icon = allIcon[data.weather[0].icon] || clear_Logo;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      
    }
  };

  useEffect(() => {
    search('London'); // Initial fetch
  }, []);

  return (
    <div>
      <div className="weather ">
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder='Search' onChange={(e) => search(e.target.value)} />
          <img src={search_Logo} alt="search-logo" onClick={() => search(inputRef.current.value)} />
        </div>
        {weatherData.icon && (
          <img src={weatherData.icon} alt="weather-img" className='weather-icon' />
        )}
        {weatherData.temperature && (
          <p className='temperature'>{weatherData.temperature} &deg;c</p>
        )}
        {weatherData.location && (
          <p className="location">{weatherData.location}</p>
        )}
        <div className="weather-data">
          <div className="col">
            <img src={humidity_Logo} alt="humidity-logo" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_Logo} alt="wind-logo" />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>wind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
