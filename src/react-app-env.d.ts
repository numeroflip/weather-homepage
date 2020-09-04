/// <reference types="react-scripts" />


type Coords = {
  latitude: number,
  longitude: number
} 

type SingleWeather = {
  temp: number,
  icon: string,
  time?: number
}

type Weather = {
  current: SingleWeather,
  daily: SingleWeather[],
  hourly: SingleWeather[]

}