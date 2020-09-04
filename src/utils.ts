
const APIKEY :string = '403cce006227cec0d2ed2cad78e6ccf2'
const URL:string = 'https://api.openweathermap.org/data/2.5/onecall'
export const IMGURL:string = 'http://openweathermap.org/img/wn/'

export const getDayFromUNIX = (timestamp : number) => {
  const date = new Date(timestamp * 1000)
  const day:string = date.toLocaleDateString('en-US', { weekday: 'long' })
  return day
}

export const getHourFromUNIX = (timestamp: number) :string => {
  const date = new Date(timestamp * 1000)
  const hour = date.getHours()
  return hour + ':00'
}


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
  let dailyArr = daily.map((weather: any) : SingleWeather => ({
    temp: weather.temp.day,
    icon: weather.weather[0].icon,
    time: weather.dt,
    iconDesc: weather.weather[0].description

     }))
  let hourlyArr = hourly.map((weather: any) : SingleWeather =>({
    temp: weather.temp,
    icon: weather.weather[0].icon,
    time: weather.dt,
    iconDesc: weather.weather[0].description
    }))
    hourlyArr = hourlyArr.slice(0,24)


  const returnObj : Weather = {

    current: {temp: current.temp, icon:current.weather[0].icon, iconDesc: current.weather[0].description
    },
    daily: dailyArr,
    hourly: hourlyArr,

  }

  return returnObj
}