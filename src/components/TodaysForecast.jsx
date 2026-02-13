import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import Loading from "./Loading"

const apiKey = "bc45c3a9cab5095ab402b5746a08d45e"

const TodaysForecast = (props) => {
  const [forecastData, setForecastData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getTodaysWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.searchedCity}&appid=${apiKey}`,
    )
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error("Error in fetching current weather data")
      })
      .then((res) => {
        console.log("here", res)
        setForecastData(res)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("error fetching data", err)
        setIsLoading(false)
      })
  }

  const convertTempToCelsius = (temp) => (temp - 273.15).toFixed(1) + " °C"

  useEffect(() => {
    getTodaysWeather()
  }, [props.searchedCity])

  return (
    <>
      {isLoading && <Loading />}
      {forecastData && (
        <>
          <p> {props.searchedCity}</p>
          <Col>
            Current temp: {convertTempToCelsius(forecastData.main.temp)}
          </Col>
          <Row>
            <Col> Min {convertTempToCelsius(forecastData.main.temp_min)}</Col>
            <Col>Max {convertTempToCelsius(forecastData.main.temp_max)}</Col>
          </Row>
        </>
      )}
    </>
  )
}

export default TodaysForecast
