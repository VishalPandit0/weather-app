import React, { useState, useEffect } from 'react'
import '../src/wb.css'
import sun_logo from '../src/assets/sun.png'
import clear from '../src/assets/clear.jpg'
import mist from '../src/assets/mist.jpg'
import Rainy from '../src/assets/Rainy.jpg'
import snowy from '../src/assets/snowy.jpg'
import thermometer from '../src/assets/thermometer.png'
import humidity from '../src/assets/humidity.png'
import visibility from '../src/assets/visibility.png'
import windy from '../src/assets/windy.png'
import sunrise from '../src/assets/sunrise.png'
import sunset from '../src/assets/sunset.png'
import moonrise from '../src/assets/moon.png'
import moonset from '../src/assets/moonset.png'


const WeatherBox = () => {
  const [city, setCity] = useState('Delhi');
  const [weatherinfo, setWeatherinfo] = useState(null);



  useEffect(() => {
    getweather();
  }, []);


  function getweather() {
    const apikey = '5f4c1fce47a38a428816c2e08ec7c9b1';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        const weather = {
          location: data.name,
          country: data.sys.country,
          temprature: data.main.temp,
          feels_like: data.main.feels_like,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          visibility: data.visibility,
          maxtemp: data.main.temp_max,
          mintemp: data.main.temp_min,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone,
          Tempcond: data.weather[0].description,
          Tempcond2: data.weather[0].main

        }
        setWeatherinfo(weather);
      }
      )
      .catch(err => { console.log(err) })
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getweather();
    }
  };




  return (
    <>
      {weatherinfo &&


        <div className='app'

          style={weatherinfo.Tempcond2 === 'clear' ? { backgroundImage: `url(${clear})` } :
            weatherinfo.Tempcond2 === 'haze' ? { backgroundImage: `url(${mist})` } :
              weatherinfo.Tempcond2 === 'rainy' ? { backgroundImage: `url(${Rainy})` } :
                { backgroundImage: `url(${Rainy})` }
          }>
          <div>
            <nav className="top">
              <div className="logo">
                <div className="logoimg"><img src={sun_logo} alt="mylogo" /></div>
                <h3> WeatherCheck </h3>
              </div>
              <div className="searchBox"><input type='text' placeholder='Enter a city' onKeyPress={handleKeyPress} onChange={(e) => setCity(e.target.value)} />
                <div className="searchButton"><button className='get' onClick={getweather}>Get</button></div>
              </div>
            </nav>

            <div className="container">
              <div className='insideContainer'>

                <div className="location">
                  <h2> {weatherinfo.location}, {weatherinfo.country}  </h2>
                </div>

                <div className="temprature">
                  <div className="tempimg"><img src={sun_logo} alt="weatherLike" /></div>
                  <h1>{weatherinfo.temprature.toFixed()}</h1>
                  <h1>&deg;</h1>
                  <div className="cOrF">
                    <div className="celcius " >
                      C
                    </div>
                    <div className='farenheit' >
                      F
                    </div>
                  </div>
                </div>

                <div className="feelslike">
                  <h1> {weatherinfo.Tempcond} </h1>
                </div>
              </div>
            </div>
            <div className="above-extra">
              <div className="fordiv">
                <img src={thermometer} alt="" />
                <p>  Feels like {weatherinfo.feels_like.toFixed()}&deg;</p>
              </div>
              <div className="fordiv">
                <img src={windy} alt="" />
                ,<p>Wind {weatherinfo.wind}km/h </p>
              </div>
              <div className="fordiv">
                <img src={humidity} alt="" />
                <p> Humidity {weatherinfo.humidity}% </p>
              </div>
              <div className="fordiv">
                <img src={visibility} alt="" />
                <p>  Visibility {weatherinfo.visibility}m</p>
              </div>

            </div>

            <br />
            <h3 className="tittle-day-details">Day Details</h3>
            <div className="container2">
              <div className="day-details">
                <div className="highAndLow">
                  <h4>Day</h4>
                  <p>
                    There will be mostly sunny skies.The high will be {weatherinfo.maxtemp} &deg;

                  </p>
                  <h4>Night</h4>
                  <p>
                    The skies will be clear. The low will be  {weatherinfo.mintemp} &deg;.
                  </p>
                </div>
              </div>

              <div className="sun">
                <h4>SUNRISE</h4>
                <div className="sunrise">
                  <img src={sunrise} alt="" className="icon" />{" "}
                  `{moment.utc(weatherinfo.sunrise, 'X').add(weatherinfo.timezone, 'seconds').format('HH:mm a')}`
                </div>
                <h4>SUNSET</h4>
                <div className="sunset">
                  <img src={sunset} alt="" className="icon" />{" "}
                  `{moment.utc(weatherinfo.sunset, 'X').add(weatherinfo.timezone, 'seconds').format('HH:mm a')}`
                </div>
              </div>

              <div className="moon">
                <h4>MOONRISE</h4>
                <div className="moonrise">
                  <img src={moonrise} alt="" className="icon" />{" "}
                  7:00 PM
                </div>
                <h4>MOONSET</h4>
                <div className='moonset'>
                  <img src={moonset} alt="" className="icon" />{" "}
                  4:00 AM
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>



  )
}

export default WeatherBox;
