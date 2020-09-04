import React from 'react'
import styled from 'styled-components'
import WeatherIcon from './WeatherIcon'
// import WeatherIcon from './WeatherIcon'



const Title = styled.h2`
  font-size: 2rem;
`

const WeatherGrid = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border: 1px solid red;
  max-width: 1200px;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
`

const Tile = styled.div`
margin: 2rem;
`
const TileGrid = styled.div`
  display: flex;

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
          <Tile key={type + i}>
              <p>{weather.temp}°C</p>
              <WeatherIcon icon={weather.icon} iconDesc={weather.iconDesc} />
        <p>{weather.time && weather.time + ':00'}</p>
        </Tile>
        )))}
      </TileGrid>
    </WeatherGrid>
  )

}

export default Forecast