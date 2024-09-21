import React, { useState } from 'react';

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch(`http://localhost:5000/ingredients?search=${searchTerm}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setResults(data); // Assuming data is an array of ingredients
        } catch (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search for ingredients..."
                />
                <button type="submit">Search</button>
            </form>
            {error && <p>Error: {error}</p>}
            <ul>
                {results.map(ingredient => (
                    <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.calories} calories
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBox;
