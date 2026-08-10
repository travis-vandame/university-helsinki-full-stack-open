import Notification from './components/Notification'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import usePersons from './hooks/usePersons'
import useNotifications from './hooks/useNotification'

const App = () => { 
  const {
    message,
    type,
    show,
    dismiss
  } = useNotifications()
  
  const personsHook = usePersons(show)

  const {
    filteredPersons,
    searchFilter,
    formData,
    setSearchFilter,
    setFormData,
    handleFormChange,
    handleSearchFilter,
    createPerson,
    updatePerson,
    removePerson
  } = personsHook

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} dismiss={dismiss} />
      <SearchFilter 
        onChange={handleSearchFilter} 
        value={searchFilter} 
      />
      <h2>add a new</h2>
      <PersonForm
        data={formData}
        handleFormChange={handleFormChange}
        handleSubmit={createPerson} 
      />
      <h2>Numbers</h2>
      <PersonList 
        data={filteredPersons} 
        handleDelete={removePerson}
      />
    </div>
  )
}

export default App 