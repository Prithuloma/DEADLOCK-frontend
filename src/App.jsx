import React, { useEffect, useState } from "react";
import API_BASE_URL, { runSampleDeadlock } from "./api";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [status, setStatus] = useState("");

  // 🔌 Check backend connection on load
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then(res => res.text())
      .then(data => setMessage(`✅ Backend connected: ${data}`))
      .catch(err => setMessage(`❌ Connection failed: ${err}`));
  }, []);

  // 🚀 Run sample deadlock
  const handleRunDeadlock = async () => {
    setStatus("Starting deadlock simulation...");
    try {
      const result = await runSampleDeadlock();
      setStatus(`✅ ${result}`);
    } catch (error) {
      setStatus(`❌ Failed: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>🧠 Java Deadlock Detection Dashboard</h1>
      <p>{message}</p>

      <button
        onClick={handleRunDeadlock}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#e91e63",
          color: "white",
          cursor: "pointer",
        }}
      >
        🚀 Run Sample Deadlock
      </button>

      {status && <p style={{ marginTop: "15px", fontSize: "18px" }}>{status}</p>}
    </div>
  );
}

export default App;

