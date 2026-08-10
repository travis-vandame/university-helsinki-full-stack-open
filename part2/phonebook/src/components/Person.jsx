const Person = ({ data: person, handleDelete }) => {
    return (
        <>
            <span>{person.name} {person.number}</span> 
            <button onClick={() => handleDelete(person.id)}>delete</button><br />
        </>
    )
}

export default Person