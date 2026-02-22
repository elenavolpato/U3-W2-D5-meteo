export default async function handler(req, res) {
  const { lat, lon } = req.query

  try {
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`,
    )

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch pollution data" })
  }
}
