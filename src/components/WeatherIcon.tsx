import React from 'react'
import {IMGURL} from '../utils'
import styled from 'styled-components'

const Icon = styled.img`
  z-index: 200;
  background-color: white;
  border-radius: 2rem;
  height: 3.5rem;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.05);
`


const WeatherIcon: React.FC<IconData> = ({icon, iconDesc}) => {

  return <Icon src={`${IMGURL}${icon}.png`} alt={iconDesc}/>
}

export default WeatherIcon