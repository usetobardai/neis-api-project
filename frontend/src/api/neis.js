const NEIS_API_KEY = process.env.REACT_APP_NEIS_API_KEY;
const ENDPOINT = "https://open.neis.go.kr/hub/schoolInfo";

export async function searchSchool(schoolName) {
  if (!NEIS_API_KEY) {
    console.error("NEIS API key is not set. Please set REACT_APP_NEIS_API_KEY environment variable.");
    return Promise.reject(new Error("API key not set."));
  }
  const params = new URLSearchParams({
    KEY: NEIS_API_KEY,
    Type: "json",
    SCHUL_NM: schoolName,
  });

  try {
    const response = await fetch(`${ENDPOINT}?${params.toString()}`);
    if (!response.ok) {
      // Handles HTTP errors like 404 or 500
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (!data.schoolInfo || data.schoolInfo.length < 2) {
      return [];
    }

    const head = data.schoolInfo[0].head;
    if (!head || head.length < 2 || !head[1].RESULT || head[1].RESULT.CODE !== "INFO-000") {
      return [];
    }

    return data.schoolInfo[1].row;
  } catch (error) {
    // Handles network errors or issues with fetch itself
    console.error("Error fetching school data:", error);
    return [];
  }
}
