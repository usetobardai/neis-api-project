import React, { useState } from "react";

export default function SchoolSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const onSearch = async () => {
    setError("");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/schools?name=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (res.ok) setResults(data);
      else setError(data.error || "오류 발생");
    } catch {
      setError("서버 연결 실패");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="학교명 입력"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onSearch}>검색</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.map((s, i) => (
          <li key={i}>
            {s.SCHUL_NM} ({s.SCHUL_KND_SC_NM})
          </li>
        ))}
      </ul>
    </div>
  );
}