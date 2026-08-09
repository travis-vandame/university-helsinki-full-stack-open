const Weather = ({ weatherData }) => {
    if (!weatherData) return null

    return (
        <div>
            <h2>Weather in {weatherData.name}</h2>
            <span>Temperature {weatherData.main.temp} Celsius</span><br />
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} /><br />
            <span>Wind {weatherData.wind.speed} m/s</span>
        </div>
    )
}
export default Weather