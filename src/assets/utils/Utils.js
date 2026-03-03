export const capitalizeFirstLetter = (city) => {
  return (
    String(city).charAt(0).toUpperCase() + String(city).slice(1).toLowerCase()
  )
}
