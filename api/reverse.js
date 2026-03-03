export default async function handler(req, res) {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ error: "Lat and Lon are required" })
  }

  try {
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
    )

    const data = await response.json()

    if (!data.length) {
      return res.status(404).json({ error: "City not found" })
    }
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch city name" })
  }
}
