const CountryList = ({ countries, handleShow }) => {
    if (!countries) return null

    return (
        <>
            {countries.map((country, index) => 
                <div key={country.cca3 || index}>
                    {country.name.common} 
                <button onClick={() => handleShow(country)}>Show</button></div>
            )}
        </>
    )
}

export default CountryList