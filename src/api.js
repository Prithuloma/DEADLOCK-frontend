const API_BASE_URL = "https://deadlock-83kw.onrender.com/api"; 
export default API_BASE_URL;


export async function runSampleDeadlock() {
  try {
    const response = await fetch(`${API_BASE_URL}/run-deadlock`);
    if (!response.ok) throw new Error("Failed to run sample deadlock");
    return await response.text();
  } catch (err) {
    throw new Error(err.message);
  }
}

