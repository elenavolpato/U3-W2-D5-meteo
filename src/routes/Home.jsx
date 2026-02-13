import { useState } from "react"
import TodaysForecast from "../components/TodaysForecast"

const Home = () => {
  return (
    <>
      <TodaysForecast searchedCity={"Itajuba,BR"} />
    </>
  )
}
export default Home
