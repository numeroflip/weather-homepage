import React, {useState, useEffect} from 'react';
import {getPosition, fetchWeather, formatWeatherData} from './utils'
import Forecast from './components/Forecast'
import Layout from './components/Layout'


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
    <Layout>
      
      <div> {weatherData === undefined 
        ? <h2>Loading weather data...</h2> 
        : (
          <div>
            <Forecast type='current' weatherData={[weatherData.current]} />
            <Forecast type='hourly' weatherData={weatherData.hourly} />
            <Forecast type='daily' weatherData={weatherData.daily} />
          </div>
      )}
      </div>
    </Layout>
  );
}

export default App;
