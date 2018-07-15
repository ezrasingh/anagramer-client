
const Search = ({ query, handleChange }) => {
    return(
        <div className="field">
            <div className="control">
                <input
                    className="input is-large"
                    value={query}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Search