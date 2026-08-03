import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
/*
const api = axios.create({
    baseURL: 'http://localhost:3001/persons',
    timeout: 10000
})
*/

const get = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
// const get = () => api.get().then(res => res.data)

const create = (data) => {
    const request = axios.post(`${baseUrl}`, data)
    return request.then(response => response.data)
}
// const create = (data) => api.post('/', data).then(res => res.data)

const update = (id, data) => {
    const request = axios.put(`${baseUrl}/${id}`, data)
    return request.then(response => response.data)
}
// const update = (id, data) => api.put(`/${id}`, data).then(res => res.data)


const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
// const remove = (id) => api.delete(`/${id}`)

export default { get, create, update, remove }