import React, { useState } from 'react';
import { searchSchool } from '../api/neis';
import SchoolList from './SchoolList';

function SchoolSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchSchool(searchTerm);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch schools. Please check the API key and network.');
      console.error(err);
      setResults([]); // Clear results on error
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>School Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter school name"
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      <SchoolList results={results} isLoading={isLoading} error={error} />
    </div>
  );
}

export default SchoolSearch;
