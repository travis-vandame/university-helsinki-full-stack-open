const CountryDetail = ({ countryData }) => {
    if (!countryData) return

    return (
        <div>
            <h1>{countryData.name.common}</h1>
            <span>Capital {countryData.capital.at(0)}</span><br />
            <span>Area {countryData.area}</span>
            <h2>Languages</h2>
            <ul>
                {Object.entries(countryData.languages).map(([lang, value]) => (
                    <li key={`${lang}-${value.toLowerCase()}`}>{value}</li>
                ))}
            </ul>
            <img
                src={countryData.flags.png}
                alt="Country Flag"
            />
        </div>
    )
}

export default CountryDetail