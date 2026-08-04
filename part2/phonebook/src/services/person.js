import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/persons',
    timeout: 10000
})

const get = () => api.get()
    .then(res => 
        res.data
        // res.status(500).json({ error: "Internal Server Error" })
    )
const create = (data) => api.post('/', data)
    .then(res => 
        res.data
        // res.status(500).json({ error: "Internal Server Error" })
    )
const update = (id, data) => api.put(`/${id}`, data)
    .then(res => 
        res.data
        // res.status(500).json({ error: "Internal Server Error" })
    )
const remove = (id) => api.delete(`/${id}`)

export default { get, create, update, remove }