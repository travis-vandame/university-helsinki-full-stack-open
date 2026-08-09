import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './service/countries'
import openWeatherService from './service/weather'
import FilterBar from './components/FilterBar'
import Notify from './components/Notify'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'
import Weather from './components/Weather'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  const [notifyMessage, setNotifyMessage] = useState({ text: '', type: '', })
  const [countryData, setCountryData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    countriesService
      .getAll()
      .then(res => {
        setAllCountries(res)
        setIsLoading(false)
      })
      .catch(() => {
        setLoadError(true)
        setIsLoading(false)
      })
  }, [])

  const handleFilter = (event) => {
    const eTargetVal = event.target.value
    
    setFilterText(eTargetVal)
    setCountryData(null)
    setWeatherData(null)

    const matches = eTargetVal.trim() === ''
      ? []
      : allCountries.filter(c => c.name.common.toLowerCase().includes(eTargetVal.toLowerCase()))
    
    if (matches.length > 10) {
      setNotifyMessage({ text: 'Too many matches, specify another filter', type: 'warn' })
      setFilteredCountries([])
      return
    }

    setFilteredCountries(matches)
    setNotifyMessage({ text: '', type: '' })
  }

  const handleShow = (country) => {
    setFilterText(country.name.common)
    setFilteredCountries([country])
    setCountryData(country)
    fetchWeather(country)
  }

  const fetchWeather = (country) => {
      setWeatherLoading(true)
      setWeatherError(false)

      const [lat, lng] = country.latlng

      openWeatherService
        .getCurrent(lat, lng)
        .then(res => {
          setWeatherData(res)
          setWeatherLoading(false)
        })
        .catch(() => { 
          setWeatherError(true)
          setWeatherLoading(false)
        })
  }

  return (
    <>
      {isLoading && <p>Loading countries...</p>}
      {!isLoading && loadError && <p>Failed to load countries.</p>}
      
      {allCountries.length > 0 && (
        <>
          <FilterBar 
            filterText={filterText} 
            handleTextChange={handleFilter} />
          <Notify
            messageText={notifyMessage.text}
            type={notifyMessage.type} />
          <CountryList
            countries={filteredCountries}
            handleShow={handleShow} />
          <CountryDetail
            countryData={countryData} />
          {weatherLoading && <p>Loading weather...</p>}
          {weatherError && <p>Failed to load weather. Please try again.</p>}
          <Weather weatherData={weatherData} />
          </>
      )}
    </>
  )
}

export default App
