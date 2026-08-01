import Person from './Person'

const PhonebookList = (props) => {
    return (
        props.persons.map(person => <Person key={person.id} person={person} />)
    ) 
}

export default PhonebookList