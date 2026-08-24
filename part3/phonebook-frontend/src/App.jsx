import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import usePeople from './hooks/usePeople'
import useNotifications from './hooks/useNotification'

const App = () => { 
  const {
    message,
    type,
    show,
  } = useNotifications()
  
  const peopleHook = usePeople(show)

  const {
    filter,
    filteredPeople,
    personForm,
    handleFormChange,
    handleFilter,
    createPerson,
    removePerson
  } = peopleHook

  return (
    <div>
      <h2>Phonebook&nbsp;</h2>
      <Notification message={message} type={type} />
      <Filter 
        onChange={handleFilter}
        value={filter} 
      />
      <h2>add a new</h2>
      <PersonForm
        person={personForm}
        handleFormChange={handleFormChange}
        handleSubmit={createPerson} 
      />
      <h2>Numbers</h2>
      <People 
        people={filteredPeople} 
        handleDelete={removePerson}
      />
    </div>
  )
}

export default App
