import { useState, useEffect } from 'react'
import personService from '../services/person'

const usePersons = (notify) => {
    const [persons, setPersons] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    const [formData, setFormData] = useState({ name: '', number: '' })

    useEffect(() => {
        personService
            .get()
            .then(response => setPersons(response))
            .catch(error => {
                notify(`Failed to load persons`, 'error')
            })
    }, [])

    const filteredPersons = persons.filter(person => 
        !searchFilter || (typeof searchFilter === 'string') && 
        person.name.toLowerCase().includes(searchFilter.toLowerCase()))

    const handleSearchFilter = (event) => setSearchFilter(event.target.value)
    
    const handleFormChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

    const createPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: formData.name,
            number: formData.number
        }

        const personFound = persons.find(p => 
            p.name.toLowerCase() === formData.name.toLowerCase()
        )

        if (personFound) {
            const confirmed = window.confirm(
                `${newPerson.name} is already added to phonebook. Replace the old number with a new one?`
            )

            if (confirmed) updatePerson(personFound.id, newPerson)
            return
        }

        personService
            .create(newPerson)
            .then(returnPerson => {
                setPersons([...persons, returnPerson])
                notify(`Added ${returnPerson.name}`, 'success')
                setFormData({ name: '', number: '' })
            })
            .catch(error => {
                notify(`Adding ${newPerson.name} failed`, 'error')
            })
        }

    const updatePerson = (id, personData) => {
        return personService
            .update(id, personData)
            .then(returnPerson => {
                setPersons(persons.map(p =>
                    p.id === id ? returnPerson : p
                ))
                notify(`Updated ${returnPerson.name}`, 'success')                
                setFormData({ name: '', number: ''})
            })
            .catch((error) => {
                notify(`Updating ${personData.name} failed`, 'error')
            })
        }

    const removePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (!person) return

        const confirmed = window.confirm(`Delete ${person.name} ?`)
        if (!confirmed) return

        personService
            .remove(id)
            .then(returnData => {
                setPersons(persons.filter(p => p.id !== id))
            })
            .catch(error => {
                notify(`Information for ${person.name} has already been removed from server`, 'error')
            })
        }

  return {
    // State
    persons,
    filteredPersons,
    searchFilter,
    formData,
    setPersons,         
    setSearchFilter,   
    setFormData,        
    // Handlers
    createPerson,       
    updatePerson,       
    removePerson,       
    // Derived/Computed
    handleFormChange,
    handleSearchFilter,
  }
}

export default usePersons