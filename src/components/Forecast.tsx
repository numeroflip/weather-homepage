import React from 'react'
import styled from 'styled-components'
import WeatherIcon from './WeatherIcon'
import { getDayFromUNIX, getHourFromUNIX } from "../utils";



const Title = styled.h2`
  font-size: 2rem;
`

const WeatherGrid = styled.div`
  display: grid;
  grid-auto-flow: row;
  max-width: 1200px;
  justify-items: center;
  margin: 1rem 0;
  align-items: center;
`

const Tile = styled.div`
  font-size: .8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: .5rem;
  padding: .5rem 1rem;
  box-shadow: 1px 1px 10px rgba(0,0,0, 0.15);
  border-radius: 2rem;
`
const TileGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  overflow: scroll;
  max-width: 100%;

`

const Forecast : React.FC<ForecastType> = ({type, weatherData}) => {
  let title: string = ''
  if (type === 'daily') {title = 'Daily Forecast'}
  else if (type === 'hourly') { title = '24 Hour Forecast'}
  else if (type === 'current') {title = 'Current Weather'}

  return (
    <WeatherGrid>
      <Title>{title}</Title>
      <TileGrid>
        {weatherData.map(((weather, i) => (
          <Tile key={type + i} >
          
          {weather.time && type === "hourly" && <p>{getHourFromUNIX(weather.time)}</p>}
          {weather.time && type === "daily" && <p>{getDayFromUNIX(weather.time)}</p>}
          <WeatherIcon icon={weather.icon} iconDesc={weather.iconDesc} />
          <p>{weather.temp}°C</p>
        </Tile>
        )))}
      </TileGrid>
    </WeatherGrid>
  )

}

export default Forecast