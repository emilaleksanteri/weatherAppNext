import ListofCountries from "./ListofCountries"
import SingleCountry from "./SingleCountry"
import Button from "./Button"
import Favourties from './Favourites'
import { useState } from "react"

const Display = ({ showCountry, setShowCountry, showOne, setShowOne, filter, weather, loaded, countriesToShow }) => {
    const [favourites, setFavourites] = useState([])

    // function to save favourite countries to appear on frontpage
    const myFavourite = () => {

      let countryToAdd
      if (countriesToShow.length === 1) {
        countryToAdd = countriesToShow[0]
      } else if (showOne === false) {
        countryToAdd = countriesToShow
      }

      const favouriteObject = {
        id: weather.name,
        countryInfo: [countryToAdd],
        weatherInfo: [weather],
      }
      setFavourites(favourites.concat(favouriteObject))
      console.log(favourites)
    }

    // function to remove country from favourites
    const deleteFavourite = (id) => {
        const newFavourites = favourites.filter((fav) => fav.id !== id)
        setFavourites(newFavourites)
    }
     
    // generates keys for arrays to be mapped
    let idCounter = 0
    
    // one country comes up in search -> display all info neccesary on it
    if (countriesToShow.length === 1 && loaded === true){
        return (
            <div>
                {countriesToShow.map(country =>
                    <SingleCountry name={country.name.common} capital={country.capital} 
                    area={country.area} languages={country.languages} flags={country.flags} key={idCounter ++} 
                    weather={weather} function={myFavourite} text='save' />
                )}
            </div>
        )
    }
    // 10 or less countries show up on search, display a list of names, send data for button functions for list component
    else if (countriesToShow.length <= 10){
        return (
            <div>
          {countriesToShow.map(country =>
            <ListofCountries key={idCounter ++} name={country.name.common}
            setShowOne={setShowOne} setShowCountry={setShowCountry} showOne={showOne} country={country} />
            )}
          </div>
        )
    }
    // if user chose to view one country with button, returns info on one country, also makes return button for going back to list view
    else if(showOne === false && loaded === true){
        return (
            <div>
                <Button onClick={()=>{setShowOne(!showOne); setShowCountry(filter);}} text='return' />
                <SingleCountry name={countriesToShow.name.common} capital={countriesToShow.capital} 
                area={countriesToShow.area} languages={countriesToShow.languages} flags={countriesToShow.flags} 
                weather={weather} function={myFavourite} text='save' />
            </div>
        )
    }
    // has favourites
    else if (favourites.length > 0) {
        console.log(favourites)
        return (
            <div className="favouriteCountries">
              {favourites.map(fav => 
                <Favourties country={fav} key={idCounter ++} deleteFavourite={deleteFavourite} />
              )}
            </div>
        )
    }
    else {
        return <p>Save favourites or have more specific search</p>
    }
}

export default Display