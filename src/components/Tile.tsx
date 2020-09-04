import styled from 'styled-components'
import React from 'react'
import WeatherIcon from './WeatherIcon'
import { getDayFromUNIX, getHourFromUNIX, isDay, getPercent } from "../utils";


type TileWrapperProps = {
  isDay: boolean,
  perc: number
}

type TileProps = {
 weather: SingleWeather,
 type: FrTypes
}

const TileWrapper = styled.div<TileWrapperProps>`
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
  min-width: 60px;
  overflow: hidden;

    &:after { 
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: ${props => props.perc + '%'};
      width: 100%;
      background-color: ${({isDay}) => isDay ? 'rgba(255, 132, 2, 0.2)' : 'rgba(121, 190, 232, 0.2)'};
      z-index: 20;
    }
`

const Tile: React.FC<TileProps> = ({weather, type}) => {
  return(
    <TileWrapper
      isDay={weather.time === undefined ? isDay(new Date()) : isDay(new Date(weather.time * 1000))} 
      perc={getPercent(weather.temp)} 
    >
          {weather.time && type === "hourly" && <p>{getHourFromUNIX(weather.time)}</p>}
          {weather.time && type === "daily" && <p>{getDayFromUNIX(weather.time)}</p>}
          <WeatherIcon icon={weather.icon} iconDesc={weather.iconDesc} />
          <p>{weather.temp}°C</p>
    </TileWrapper>
  )
}

export default Tile;