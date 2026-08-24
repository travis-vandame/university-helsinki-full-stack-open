import axios from 'axios'

const api = axios.create({
    baseURL: '/api/persons',
    timeout: 10000
})

api.interceptors.request
    .use((req) => {
        console.debug(req)
        const method = (req.method || 'get').toUpperCase() // Why do I need get here

        console.groupCollapsed(`Axios Request: [${method}] ${req.baseURL}`)

        let dataType = 'Empty Body'
        let formattedData = {}

        if (req.data) {
            if (req.data instanceof FormData) {
                dataType = 'file/multipart'
                formattedData = Object.fromEntries(req.data.entries())
            } else if (typeof req.data === 'object') {
                dataType = Array.isArray(req.data) ? 'JSON Array' : 'JSON Object'
                formattedData = req.data
            } else {
                dataType = `Raw ${typeof req.data}`
                formattedData = { value: req.data }
            }
        }

        console.table([{
            'Method': method,
            'Endpoint': req.baseURL,
            'Data Type': dataType,
            'Query Params': req.params ? JSON.stringify(req.params) : 'None'
        }])
        
        if (req.data) {
            console.log('Payload:', formattedData);
        }

        console.groupEnd()
        
        return req
    },
    (error) => {
        console.log('Response Error:', error.message)
        throw error
    }
    )

api.interceptors.response
    .use(
        (res) => {
            console.groupCollapsed(`Axios Response: [${res.status}] ${res.config.baseURL}`)

            const rawData = res.data

            if (rawData === undefined || rawData === null || rawData === '') {
                console.log('No Content')
            } else if (rawData instanceof Blob || rawData instanceof ArrayBuffer) {
                console.log('File Data Found', {
                    type: rawData.type || 'Binary',
                    size: `${rawData.size || rawData.byteLength || 0} bytes`
                })
            } else if (Array.isArray(rawData)) {
                console.log(`Data Array (${rawData.length})`)
                console.table(rawData)
            } else if (typeof rawData === 'object') {
                console.log('Single Object')
                console.table([rawData])
            } else {
                console.log(`Plain Text "${rawData}"`)
            }

            console.groupEnd()
            return res
        },
        (error) => {
            // Standardize error tracking
            console.group(`Network Error Encountered`);
            console.error(`Message: ${error.message}`);
            
            if (error.response) {
                console.error(`Status Code: ${error.response.status}`);
                console.error(`Server Error Details:`, error.response.data);
            } else if (error.request) {
                console.error('No response received from the server. Check your connection.');
            }
            
            console.groupEnd();
            
            // Always throw to pass the error down to your UI's catch block
            throw error; 
        }
    )

const get = () => {
    const request = api.get()
    return request
        .then(res => res.data)
        .catch(error => {
            return Promise.reject(error)
        })
}

const create = (data) => {
    const request = api.post(`/`, data)
    return request
        .then(res => res.data)
        .catch(error => {
            return Promise.reject(error)
        })
}

const update = (id, data) => {
    const request = api.patch(`/${id}`, data)
    return request
        .then(res => res.data)
        .catch(error => {
            return Promise.reject(error)
        })
}

const remove = (id) => {
    const request = api.delete(`/${id}`)
    return request
        .then(res => res.data)
        .catch(error => {
            return Promise.reject(error)
        })
}

export default { get, create, update, remove }
