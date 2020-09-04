import React from 'react'
import {IMGURL} from '../utils'


const WeatherIcon: React.FC<IconData> = ({icon, iconDesc}) => {

  return < img src={`${IMGURL}${icon}.png`} alt={iconDesc}/>
}

export default WeatherIcon