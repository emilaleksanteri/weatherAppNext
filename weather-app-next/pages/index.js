import { useState, useEffect } from 'react'
import Search from './components/Search'
import Display from './components/Display'
import apiServices from './api/services/APIs'

function App() {
  const [weather, setWether] = useState([]) // weather data
  const [loaded, setLoaded] = useState(false) // to let components know if weather data can be pulled
  const [countries, setNewCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [showCountry, setShowCountry] = useState([]) // list of countries filtered with search
  const [showOne, setShowOne] = useState(true) // if button is clicked, show one country

  useEffect(() => {
    const fetchCountries = async () => {
      const countryData = await apiServices.getCountries()
      setNewCountries(countryData)
    }
    fetchCountries()
  }, [])

  const filter = countries.filter(country => 
    country.name.official.toLowerCase().includes(newSearch.toLocaleLowerCase()))  // search country to show

  // changes state from true to false, if true -> countries shown are everything matching search. 
  // False -> show one specific country (linked to show button)
  const countriesToShow = showOne
    ? filter
    : showCountry

  // start weather API if conditions met
  useEffect(() => {
    if (filter.length === 1 || showOne === false){
      // dedice capital coordinates if button clicked to show country
      if (showOne === false){
        var coord = countriesToShow.capitalInfo.latlng
        var lat = coord[0]
        var lon = coord[1]
      }
      // if country chosen with filtering till 1 country
      else {
        coord = filter.map(item => item.capitalInfo.latlng)
        lat = coord[0][0]
        lon = coord[0][1]
      }
      const coordinatesObject = { lat: lat, lon: lon }
      weatherHook(coordinatesObject) // call function to fetch
      
      // conditions to only run the useEffect if these conditions change
      }},[filter.length !== 1 || showOne === true, filter.length === 1 || showOne === false])

  // launch weather api
  const weatherHook = async coordinatesObject => {
    const weatherData = await apiServices.getWeather(coordinatesObject)
    setWether(weatherData)
    setLoaded(true)
  }

  return (
    <div>
      {/* search field */}
      <Search
        text='find countries' 
        value={newSearch} 
        onChange={(event) => 
          setNewSearch(event.target.value)}
      />
      {/* Everything to be displayed to the user */}
      <Display filter={filter} showCountry={showCountry}
        setShowCountry={setShowCountry} showOne={showOne} 
        setShowOne={setShowOne} weather={weather} loaded={loaded} countriesToShow={countriesToShow}
      />
    </div>
  );
}

export default App;