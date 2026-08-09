import axios from 'axios'

const API_ENDPOINT = import.meta.env.VITE_OPENWEATHER_APP_ENDPOINT
const API_KEY = import.meta.env.VITE_OPENWEATHER_APP_ID

const openWeatherApi = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000
})

const getCurrent = (lat, lon) => openWeatherApi
    .get(`/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(res => res.data)

export default { getCurrent }