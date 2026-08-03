const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="name">name</label>
            <input type="text" id="name" name="name" 
                onChange={props.handleFormChange} 
                value={props.formData.name} /> <br />
            <label htmlFor="number">number</label>
            <input type="tel" name="number" 
                onChange={props.handleFormChange} 
                value={props.formData.number} /><br />
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm