import React from 'react'
import styled from 'styled-components'
import Tile from './Tile'



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
        {weatherData.map((weather, i) => (
          <Tile 
          weather={weather} 
          type={type}
          key={type + i} 
        />
        ))}
        
      </TileGrid>
    </WeatherGrid>
  )

}

export default Forecast