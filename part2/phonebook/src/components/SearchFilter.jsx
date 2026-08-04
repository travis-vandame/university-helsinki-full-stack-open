const SearchFilter = ({ onChange, value }) => {
    return (
        <>
            <label htmlFor="search">filter shown with</label>
            <input id="search" name="search" type="search" 
                onChange={onChange} value={value} /> 
        </>
    )
}

export default SearchFilter