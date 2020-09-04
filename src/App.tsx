import React, {useState, useEffect} from 'react';
import {getPosition, fetchWeather, formatWeatherData, fetchCityFromCoords} from './utils'
import Forecast from './components/Forecast'
import Layout from './components/Layout'
import PlaceHeader from './components/PlaceHeader'



const App:React.FC = () => {

  const [position, setPosition] = useState<Coords | undefined>(undefined)
  const [weatherData, setWeatherData] = useState<Weather | undefined>(undefined)
  const [cityData, setCityData] = useState("Loading")

  // Get the position
  useEffect(()=> {
    const updatePosition = async () => {
        const pos: Coords | undefined = await getPosition() 
        setPosition(pos)
    }
    updatePosition()
  }, [])

  // update weather based on position
  useEffect(() => {
    const handleWeatherAndCity = async () => {
      if(position !== undefined) {
        const weatherData = await fetchWeather(position.latitude, position.longitude)
        const formatedData = formatWeatherData(weatherData)
        setWeatherData(formatedData)
        console.log(weatherData)
        const city = await fetchCityFromCoords(position.latitude, position.longitude)
        setCityData(city.display_name)
    }}
    handleWeatherAndCity()

  },[position])

  return (
    <Layout> 
       {weatherData === undefined 
        ? (
          <>
            <h2>Loading weather data...</h2>
            <p>Please allow location access, if you haven't.</p>
          </> 
          )
        : (
          <>
            <PlaceHeader>{cityData}</PlaceHeader>
            <Forecast type='current' weatherData={[weatherData.current]} />
            <Forecast type='hourly' weatherData={weatherData.hourly} />
            <Forecast type='daily' weatherData={weatherData.daily} />
          </>
      )}
      <footer>Site made by <a rel="noopener noreferrer" href="https://numeroflip.github.io/" target="_blank" >Áron Berényi</a></footer>
    </Layout>
  );
}

export default App;
