import React from 'react';

function SchoolList({ results, isLoading, error }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!results || results.length === 0) {
    return <p>No schools found.</p>;
  }

  return (
    <ul>
      {results.map((school) => (
        <li key={`${school.ATPT_OFCDC_SC_CODE}-${school.SD_SCHUL_CODE}`}>
          <strong>{school.SCHUL_NM}</strong>: {school.ORG_RDNMA}
        </li>
      ))}
    </ul>
  );
}

export default SchoolList;
