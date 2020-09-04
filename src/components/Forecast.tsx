import React from 'react'
import styled, {css} from 'styled-components'
import WeatherIcon from './WeatherIcon'
import { getDayFromUNIX, getHourFromUNIX, isDay, getPercent } from "../utils";


type TileProps = {
  isDay: boolean | undefined,
  perc: number
}

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

const Tile = styled.div<TileProps>`
  position: relative;
  font-size: .8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: .5rem;
  padding: .5rem 1rem;
  box-shadow: 1px 1px 10px rgba(0,0,0, 0.15);
  border-radius: 2rem;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: ${props => props.perc + '%'};
      width: 100%;
      border-radius: 0 0 2rem 2rem;
      background-color: ${({isDay}) => isDay ? 'rgba(255, 132, 2, 0.15)' : 'rgba(121, 190, 232, 0.2)'};
      z-index: 20;
    }
`

const TileGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  overflow: scroll;
  max-width: 100%;
  position: relative;


`

const Forecast : React.FC<ForecastType> = ({type, weatherData}) => {
  let title: string = ''
  if (type === 'daily') {title = '7 Day Forecast'}
  else if (type === 'hourly') { title = '24 Hour Forecast'}
  else if (type === 'current') {title = 'Current Weather'}

  

  return (
    <WeatherGrid>
      <Title>{title}</Title>
      <TileGrid>
        {weatherData.map(((weather, i) => (
          <Tile 
          isDay={weather.time === undefined ? isDay(new Date()) : isDay(new Date(weather.time * 1000))} 
          key={type + i} 
          perc={getPercent(weather.temp)} 
          >
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