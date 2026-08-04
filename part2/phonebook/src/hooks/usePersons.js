import { useState, useEffect } from 'react'
import personService from '../services/person'

const usePersons = (setNotify) => {
    const [persons, setPersons] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    const [formData, setFormData] = useState({ name: '', number: '' })

    useEffect(() => {
        personService
        .get()
        .then(response => setPersons(response))
        .catch(error => {
            setNotify(`Failed to load persons`, 'error')
        })
    }, [])

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
                setNotify(`Added ${returnPerson.name}`, 'success')
                setFormData({ name: '', number: '' })
            })
            .catch(error => {
                setNotify(`Adding ${newPerson.name} failed`, 'error')
            })
    }

    const updatePerson = (id, personData) => {
        return personService
            .update(id, personData)
            .then(returnPerson => {
                setPersons(persons.map(p =>
                    p.id === id ? returnPerson : p
                ))
                setNotify(`Updated ${returnPerson.name}`, 'success')                
                setFormData({ name: '', number: ''})
            })
            .catch((error) => {
                setNotify(`Updatinig ${personData.name} failed`, 'error')
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
                setNotify(`Information for ${person.name} has already been remove from server`, 'error')
            })
        }

    const filteredPersons = persons.filter(person => 
        !searchFilter || typeof searchFilter === 'string' && 
        person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return {
    // State
    persons,
    filteredPersons,
    searchFilter,
    formData,
    setPersons,         // for updatePerson or removePerson
    setSearchFilter,    // for searchFilter
    setFormData,        // for createPerson or updatePerson
    // Handlers
    createPerson,       // event => void
    updatePerson,       // (id, personData) => void
    removePerson,       // (id) => void
    // Derived/Computed
    handleFormChange,
    handleSearchFilter,
    //filteredPersons // compute this in the hook and return it, or return persons + searchFilter and let App filter. Returning it pre-computed is cleaner since filtering is App-specific logic.
  }
}

export default usePersons