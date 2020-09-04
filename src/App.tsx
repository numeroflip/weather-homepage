import React, {useState, useEffect} from 'react';
import {getPosition, fetchWeather, formatWeatherData} from './utils'


function App() {

  const [position, setPosition] = useState<Coords | undefined>(undefined)

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
        const formatedData = formatWeatherData(weatherData)
        console.log(formatedData);
      }
  }
    handleWeather()

  },[position])

  return (
    <div>
      <h1>Hey, what's the weather today?</h1>
    </div>
  );
}

export default App;
