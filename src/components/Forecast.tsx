import React from 'react'
import styled from 'styled-components'
import WeatherIcon from './WeatherIcon'



const Title = styled.h2`
  font-size: 2rem;
`


const Forecast : React.FC<ForecastType> = ({type, weatherData}) => {

  let usedData: SingleWeather[]
  let title: string = ''
  
  switch(type) {
    case 'daily' :
      title = 'Daily Forecast'
      usedData = weatherData.daily
      break
    case 'hourly' :
      title = '24 Hour Forecast'
      usedData = weatherData.hourly
      break
    case 'current' :
      title = 'Current Weather'
      usedData = [weatherData.current]
      break
  }


  return (
    <div>
      <Title>{title}</Title>
      {/* {usedData.map(() => (

      ))}  */}
      {/* <WeatherIcon icon={usedData.icon} iconDesc={usedData.iconDesc} /> */}
    </div>
  )

}

export default Forecast