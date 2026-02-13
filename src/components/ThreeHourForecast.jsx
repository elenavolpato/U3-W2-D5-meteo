import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import weatherDescriptions from "../data/weatherDescriptions.json"

const ThreeHoursForecast = (props) => {
  const { lon, lat, apiKey } = props

  const [weatherData, setWeatherData] = useState(null)
  const convertTempToCelsius = (temp) => (temp - 273.15).toFixed(1) + " °C"

  const getThreeHoursForecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    )
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error("Error in fetching current weather data")
      })
      .then((data) => {
        setWeatherData(sliceWeatherData(data.list))
      })
      .catch((err) => {
        console.error("error fetching data", err)
      })
  }

  const renderCurrentConditions = (main, description) => {
    const category = main.toLowerCase()
    const weatherIcon =
      weatherDescriptions[category]?.find(
        (item) => item.description === description,
      )?.icon || "bi-question-circle"

    return weatherIcon
  }

  const sliceWeatherData = (data) => {
    return data.slice(0, 7)
  }

  const formatDate = (date) => {
    const hour = new Date(date).getHours()
    return hour
  }

  useEffect(() => {
    if (lat && lon) {
      getThreeHoursForecast()
    }
  }, [lat, lon])

  return (
    <Col
      xs={12}
      lg={7}
      className="border border-1 border-white-50 rounded p-4 light-bg align-items-center m-0"
    >
      <h5 className="m-0">Today's 3 hours forecast</h5>
      <Row>
        {weatherData &&
          weatherData.map((hourForecast) => (
            <Col className="text-white text-center align-items-center pt-4">
              <p>{formatDate(hourForecast.dt_txt)}h00</p>
              <h5>{convertTempToCelsius(hourForecast.main.temp)}</h5>
              <i
                className={`bi ${renderCurrentConditions(hourForecast.weather[0].main, hourForecast.weather[0].description)} fs-1 mt-2 `}
              ></i>
            </Col>
          ))}
      </Row>
    </Col>
  )
}

export default ThreeHoursForecast
