import SingleCountry from "./SingleCountry"
import { useState } from "react"

const Favourites = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const removeCountry = () => {
    props.deleteFavourite(props.country.id)
  }

  const temeprature = (props.country.weatherInfo[0].main.temp - 273.15).toPrecision(3)

  return (
    <div>
        <div className="favourite-country" style={hideWhenVisible}>
          <p>{props.country.countryInfo[0].name.common}</p>
          <p>{temeprature} Celcius</p>
          <button onClick={removeCountry}>remove</button>
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
            <SingleCountry weather={props.country.weatherInfo[0]} name={props.country.countryInfo[0].name.common}
            capital={props.country.countryInfo[0].capital} area={props.country.countryInfo[0].area} languages={props.country.countryInfo[0].languages}
            flags={props.country.countryInfo[0].flags} function={toggleVisibility} text='close'
             />
        </div>
    </div>
  )
}

export default Favourites