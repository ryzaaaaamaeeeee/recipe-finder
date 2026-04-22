
function SearchForm ({onSearch, query, setQuery}) {
    return (
        <form onSubmit={onSearch}>
            <input
            type="text"
            placeholder="Search for recipe..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;