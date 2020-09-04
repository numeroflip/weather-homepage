import { parse } from "path"
import { timeStamp } from "console"

const APIKEY :string = '403cce006227cec0d2ed2cad78e6ccf2'
const URL:string = "https://api.openweathermap.org/data/2.5/onecall"


export const getPosition = async () => {
  try {
    const position: any = await new Promise((req, res) => navigator.geolocation.getCurrentPosition(req, res))
    const coords:Coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
     
    } 
    return coords
  } catch(e) {console.log(e)}
}

export const fetchWeather = async (lat :number, lon :number) => {
  try {
    let weatherData = await fetch(`${URL}?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`)
    let parsedData = await weatherData.json()
    return parsedData
  } catch(e) {console.log(e)}
}



export const formatWeatherData = (data:any):Weather => {
  const {current, daily, hourly} = data
  let dailyArr = daily.map((weather: any) : SingleWeather => ({temp: weather.temp.day, icon: weather.weather[0].icon }))
  let hourlyArr = hourly.map((weather: any) : SingleWeather =>({
    temp: weather.temp,
    icon: weather.weather[0].icon,
    time: new Date(weather.dt * 1000).getHours()
    }))
    hourlyArr = hourlyArr.slice(0,24)


  const returnObj : Weather = {

    current: {temp: current.temp, icon:current.weather[0].icon},
    daily: dailyArr,
    hourly: hourlyArr
  }

  return returnObj
}