import { Container, Row } from "react-bootstrap"
import TodaysForecast from "../components/TodaysForecast"
import PollutionStatus from "../components/PollutionStatus"
import OtherStatus from "../components/OtherStatus"
import ThreeHoursForecast from "../components/ThreeHourForecast"
import SearchBar from "../components/SearchBar"
import Loading from "../components/Loading"
import { useState, useEffect } from "react"

const Home = () => {
  const [searchedCity, setSearchedCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")

  const getCityName = (lat, lon) => {
    setIsLoading(true)

    fetch(`/api/reverse?lat=${lat}&lon=${lon}`)
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Error fetching city name: ${text}`)
          })
        }
        return res.json()
      })
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error("No city found")
        }
        const city = `${capitalizeFirstLetter(data[0].name)},  ${data[0].country.toUpperCase()}`

        setSearchedCity(city)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("error fetching data", err)
        setIsLoading(false)
      })
  }

  const getTodaysWeather = () => {
    setIsLoading(true)
    fetch(`/api/weather?city=${searchedCity}`)
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error("Error in fetching current weather data")
      })
      .then((data) => {
        setWeatherData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("error fetching data", err)
        setIsLoading(false)
      })
  }

  const capitalizeFirstLetter = (city) => {
    return (
      String(city).charAt(0).toUpperCase() + String(city).slice(1).toLowerCase()
    )
  }

  const handleSearchClick = (cityName) => {
    setSearchedCity(cityName)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          setLat(latitude)
          setLon(longitude)

          getCityName(latitude, longitude)
        },
        function (error) {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  useEffect(() => {
    if (searchedCity) {
      getTodaysWeather()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedCity])

  return (
    <>
      <h1 className="mt-5 text-center title">Do I need a umbrella? </h1>
      <Container
        className="d-flex flex-column justify-content-center align-items-center
        h-100 pt-5 "
      >
        <SearchBar handleSearchClick={handleSearchClick} />
        <h2>Weather forecast for {searchedCity}</h2>
        <Row className="gap-3 container-fluid justify-content-center my-3">
          {isLoading && <Loading />}
          {weatherData && <TodaysForecast weatherData={weatherData} />}
          {isLoading && <Loading />}
          {weatherData && (
            <ThreeHoursForecast
              lon={lon}
              lat={lat}
            />
          )}
        </Row>
        <Row className="gap-3 container-fluid justify-content-center">
          {isLoading && <Loading />}
          {weatherData && (
            <PollutionStatus
              lon={/* weatherData.coord. */ lon}
              lat={lat}
            />
          )}
          {isLoading && <Loading />}
          {weatherData && <OtherStatus weatherData={weatherData} />}
        </Row>
      </Container>
    </>
  )
}
export default Home
