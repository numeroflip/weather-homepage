import React, {useState, useEffect} from 'react';
import {getPosition, fetchWeather, formatWeatherData, IMGURL} from './utils'
import Forecast from './components/Forecast'


function App() {

  const [position, setPosition] = useState<Coords | undefined>(undefined)
  const [weatherData, setWeatherData] = useState<Weather | undefined>(undefined)


  useEffect(()=> {
    const updatePosition = async () => {
        const pos = await getPosition() 
        setPosition(pos)
    }
    updatePosition()
  }, [])

  useEffect(() => {
    const handleWeather = async () => {
      if(position !== undefined) {
        const weatherData = await fetchWeather(position.latitude, position.longitude)
        console.log(weatherData)
        const formatedData = formatWeatherData(weatherData)
        setWeatherData(formatedData)
        console.log(formatedData)
      }
  }
    handleWeather()

  },[position])

  return (
    <div>
      
      <div> {weatherData === undefined 
        ? <h2>Loading</h2> 
        : (
          <div>
            <Forecast type='current' weatherData={weatherData} />
            <Forecast type='hourly' weatherData={weatherData} />
            <Forecast type='daily' weatherData={weatherData} />
            <h2>Current Weather is: {weatherData?.current.temp}°C</h2>
            <img src={`${IMGURL}${weatherData.current.icon}.png`} alt={weatherData.current.iconDesc}/>
            <div>
              <h2>24 hour forecast</h2>
              {weatherData.hourly.map((hour, i) => (
                <div key={'hourly-'+i}>
                  <div>{hour.time}:00</div>
                  <img src={`${IMGURL}${hour.icon}.png`} alt={hour.iconDesc}/>
                  <p>{hour.temp}°C</p>
                </div>
              ))} 
            </div>
            <div>
            </div>
          </div>
      )}
      </div>
    </div>
  );
}

export default App;
