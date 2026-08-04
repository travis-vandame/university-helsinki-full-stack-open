import { useState } from 'react'

const useNotification = () => {
    const [message, setMessage] = useState(null)
    const [type, setType] = useState(null)

    const show = (messageText, typeValue) => {
        setMessage(messageText)
        setType(typeValue)
        setTimeout(() => {
            setMessage(null)
            setType(null)
        }, 5000)
    }

    const dismiss = () => {
        setMessage(null)
        setType(null)
    }

    return { message, type, show, dismiss }    
}

export default useNotification