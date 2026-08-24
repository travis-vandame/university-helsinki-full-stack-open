import { useState, useEffect } from 'react'
import personService from '../services/person'

const usePeople = (notify) => {
    const [filter, setFilter] = useState('')
    const [personForm, setPersonForm] = useState({ name: '', number: '' })    
    const [people, setPeople] = useState([])

    useEffect(() => {
        personService
            .get()
            .then(response => setPeople(response))
            .catch(error => {
                notify(`Failed to load persons`, 'error')
            })
    }, [])

    const filteredPeople = people.filter(person => 
        !filter || (typeof filter === 'string') && 
        person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }
    
    const handleFormChange = (event) => setPersonForm({ 
        ...personForm, 
        [event.target.name]: event.target.value 
    })

    const createPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: personForm.name,
            number: personForm.number
        }

        const personFound = people.find(p => 
            p.name.toLowerCase() === personForm.name.toLowerCase()
        )

        if (personFound) {
            const confirmed = window.confirm(
                `${newPerson.name} is already added to phonebook. Replace the old number with a new one?`
            )
            if (!confirmed) return
        }

        personService
            .create(newPerson)
            .then(returnPerson => {
                setPeople(prevPeople => {
                    const exists = prevPeople.some(person => 
                        person.id === returnPerson.id)

                    if (exists) {
                        notify(`Updated ${returnPerson.name}`, 'success')
                        return prevPeople.map(person => 
                            person.id === returnPerson.id ? returnPerson: person)
                    } else {
                        notify(`Added ${returnPerson.name}`, 'success')
                        return [...people, returnPerson]
                    }
                })                
                setPersonForm({ name: '', number: '' })
            })
            .catch(error => {
                const serverError = error.response.data.error
                notify(serverError, 'error')
            })
        }
        
    const removePerson = (id) => {
        const person = people.find(p => p.id === id)
        if (!person) return

        const confirmed = window.confirm(`Delete ${person.name} ?`)
        if (!confirmed) return

        personService
            .remove(id)
            .then(returnData => {
                setPeople(people.filter(p => p.id !== id))
                notify(`Removed ${person.name}`, 'success')
            })
            .catch(error => {
                notify(`Information for ${person.name} has already been removed from server`, 'error')
            })
        }

  return {
    // State
    filter,
    filteredPeople,
    personForm,
    people,
    // State Functions
    setPeople,         
    setFilter,   
    setPersonForm,        
    // Handler Functions
    createPerson,      
    removePerson,       
    // Derived/Computed Functions
    handleFormChange,
    handleFilter,
  }
}

export default usePeople