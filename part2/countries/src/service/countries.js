import axios from 'axios'

const api = axios.create({
    baseURL: 'https://studies.cs.helsinki.fi/restcountries/api',
    timeout: 10000
})

const getAll = () => api.get(`/all`).then(res => res.data)

export default { getAll }