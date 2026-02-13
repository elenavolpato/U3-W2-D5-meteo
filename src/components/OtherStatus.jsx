import { Col, Row } from "react-bootstrap"

const OtherStatus = (props) => {
  const toKmh = (speed) => (speed * 3.6).toFixed(1)
  return (
    <Col
      xs={12}
      lg={4}
      className="pt-4 border border-1 border-white-50 rounded light-bg"
    >
      <Row className="align-items-center h-100">
        <Col
          xs={4}
          className="d-flex flex-column justify-content-center"
        >
          <h5>Humidity</h5>
          <p className="fs-3 fw-medium mt-4 mb-0">
            <i className="bi bi-droplet text-info fs-2"></i>
            {props.weatherData.main.humidity}%
          </p>
        </Col>
        <Col
          xs={8}
          className="d-flex flex-column justify-content-center"
        >
          <h5>Wind</h5>
          <Row className="pt-3 g-2">
            <Col xs={7}>
              <span className="fs-3 fw-medium">
                {toKmh(props.weatherData.wind.speed)}&nbsp;
              </span>
              km/h
            </Col>
            <Col xs={5}>
              <span className="fs-3 fw-medium">
                {props.weatherData.wind.deg}
              </span>{" "}
              deg
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}

export default OtherStatus
