/// <reference types="react-scripts" />


type Coords = {
  latitude: number,
  longitude: number
} 

type SingleWeather = {
  temp: number,
  icon: string,
  iconDesc: string,
  time?: number
  
}

type Weather = {
  current: SingleWeather,
  daily: SingleWeather[],
  hourly: SingleWeather[]

}

type IconData = {
  icon: string,
  iconDesc: string
}

type ForecastType = {
  type: 'current' | 'daily' | 'hourly',
  weatherData: SingleWeather[]
}