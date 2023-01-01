import axios from 'axios'

const api_key = process.env.NEXT_PUBLIC_API_KEY

const getCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all')
  return response.data
}

const getWeather = async countryOject => {
  const lat = countryOject.lat
  const lon = countryOject.lon
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+api_key

  const response = await axios.get(url)
  return response.data
}

export default { getCountries, getWeather }