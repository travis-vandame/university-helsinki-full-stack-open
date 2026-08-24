import Person from './Person'

const People = ({ people, handleDelete }) => {
    return people.map(person => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
    ))
}

export default People