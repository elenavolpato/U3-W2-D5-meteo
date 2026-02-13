import { Spinner } from "react-bootstrap"

const Loading = () => {
  return (
    <Spinner
      className="d-flex justify-content-center"
      variant="warning"
      animation="border"
    />
  )
}
export default Loading
