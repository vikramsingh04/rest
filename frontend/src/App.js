import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filters, setFilters] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post('http://localhost:3000/bfhl', jsonData);
            setResponse(res.data);
        } catch (error) {
            alert("Invalid JSON or API call failed!");
        }
    };

    const handleFilterChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setFilters(value);
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div>
                {filters.includes("Alphabets") && <p>Alphabets: {response.alphabets.join(", ")}</p>}
                {filters.includes("Numbers") && <p>Numbers: {response.numbers.join(", ")}</p>}
                {filters.includes("Highest lowercase alphabet") && <p>Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(", ")}</p>}
            </div>
        );
    };

    return (
        <div>
            <h1>21BCE5110</h1>
            <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder='Enter JSON input here' 
            />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <div>
                    <select multiple onChange={handleFilterChange}>
    <option value="Alphabets">Alphabets</option>
    <option value="Numbers">Numbers</option>
    <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
</select>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;
