
// Info for OpenWeather
const APIKEY :string = '403cce006227cec0d2ed2cad78e6ccf2'
const URL:string = 'https://api.openweathermap.org/data/2.5/onecall'
export const IMGURL:string = 'https://openweathermap.org/img/wn/'

// Info for LocationIQ (Reverse geocoding)
const APIKEYCITY :string = 'cf45dfc024bc96'
const URLCITY: string = 'https://eu1.locationiq.com/v1/reverse.php?'


/* 
======================HELPER FUNCTIONS===============================
*/

export const getPercent = (temp : number) : number => {
  const max = 50;
  const min =-30;
  const range = max - min;
  return ((temp - min) / range) * 100
}

export const getDayFromUNIX = (timestamp : number) : string => {
  const date = new Date(timestamp * 1000)
  const day:string = date.toLocaleDateString('en-US', { weekday: 'long' })
  return day
}

export const isDay = (date: Date) :boolean => {
  const hour = date.getHours()
  return hour >=7 && hour <= 20 
}

export const getHourFromUNIX = (timestamp: number) :string => {
  const date = new Date(timestamp * 1000)
  const hour = date.getHours()
  return hour + ':00'
}

// HTML Geolocation
export const getPosition = async () => {
  try {
    const position: {coords: {latitude: number, longitude: number}} = await new Promise((req, res) => navigator.geolocation.getCurrentPosition(req, res))
    const coords:Coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    } 
    return coords
  } catch(e) {console.error('Please allow location access in order to use the app', e)}
}


/* 
======================FETCHING DATA===============================
*/

export const fetchWeather = async (lat :number, lon :number) => {
  try {
    let weatherData = await fetch(`${URL}?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`)
    let parsedData = await weatherData.json()
    return parsedData
  } catch(e) {console.log(e)}
}

export const fetchCityFromCoords = async (lat:number, lon:number) => {
  const city = await fetch(`${URLCITY}key=${APIKEYCITY}&lat=${lat}&lon=${lon}&format=json`)
  const cityObj = await city.json()
  return cityObj
}

/* 
======================FORMATING DATA===============================
*/
export const formatWeatherData = (data:any):Weather => {

  const {current, daily, hourly} = data
  
  let dailyArr = daily.map((weather: any) : SingleWeather => ({
    temp: Math.round(weather.temp.day),
    icon: weather.weather[0].icon,
    time: weather.dt,                           // Time comes is in UNIX timestamp!
    iconDesc: weather.weather[0].description
     }))

  let hourlyArr = hourly.map((weather: any) : SingleWeather =>({
    temp: Math.round(weather.temp),
    icon: weather.weather[0].icon,
    time: weather.dt,
    iconDesc: weather.weather[0].description
    }))

    hourlyArr = hourlyArr.slice(0,24)  // for 24 hour forecast


  const returnObj : Weather = {

    current: {temp: Math.round(current.temp), icon:current.weather[0].icon, iconDesc: current.weather[0].description
    },
    daily: dailyArr,
    hourly: hourlyArr,

  }

  return returnObj
}