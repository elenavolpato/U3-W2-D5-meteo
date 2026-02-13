import { Col, Row } from "react-bootstrap"

const OtherStatus = (props) => {
  const toKmh = (speed) => (speed * 3.6).toFixed(1)
  return (
    <Col
      xs={12}
      lg={4}
    >
      <Row className="d-flex  justify-content-between ">
        <Col
          xs={6}
          className=""
        >
          <div className="d-flex flex-column justify-content-center align-items-center pt-4 pb-4 border border-1 border-white-50 rounded light-bg h-100 no-margin">
            <h5>Humidity</h5>
            <p className="fs-3 fw-medium mt-4 mb-0">
              <i className="bi bi-droplet text-info fs-2"></i>
              {props.weatherData.main.humidity}%
            </p>
          </div>
        </Col>
        <Col xs={6}>
          <div className="d-flex flex-column justify-content-end align-items-center pt-4 pb-4 border border-1 border-white-50 rounded light-bg h-100 wind-container">
            <h5>
              <i class="bi bi-wind"></i>&nbsp;Wind
            </h5>
            <div className="mt-3">
              <div className="text-center mb-2">
                <span className="fs-3 fw-medium">
                  {toKmh(props.weatherData.wind.speed)}
                </span>
                &nbsp;km/h
              </div>
              <div className="text-center">
                <span className="fs-3 fw-medium">
                  {props.weatherData.wind.deg}
                </span>
                &nbsp;deg
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  )
}

export default OtherStatus
