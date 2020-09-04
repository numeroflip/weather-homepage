import React, {useState, useEffect} from 'react';
import {getPosition, fetchWeather, formatWeatherData} from './utils'


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
      <h1>Hey, what's the weather today?</h1>
      <div> {weatherData === undefined ? <h2>Loading</h2> : (
        <h2>Current Weather is: {weatherData?.current.temp}°C</h2>

      )}
      </div>
    </div>
  );
}

export default App;
