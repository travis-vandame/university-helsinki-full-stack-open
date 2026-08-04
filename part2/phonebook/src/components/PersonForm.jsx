const PersonForm = ({ data: person, handleSubmit, handleFormChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">name</label>
            <input type="text" id="name" name="name" 
                onChange={handleFormChange} 
                value={person.name} /> <br />
            <label htmlFor="number">number</label>
            <input type="tel" name="number" 
                onChange={handleFormChange} 
                value={person.number} /><br />
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm