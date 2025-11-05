import React, { useEffect, useState } from "react";
import API_BASE_URL, { runSampleDeadlock } from "./api";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [status, setStatus] = useState("loading");
  const [runStatus, setRunStatus] = useState("");

  // ✅ Check backend health
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Backend not reachable");
        const data = await res.text();
        setMessage(`✅ Backend connected: ${data}`);
        setStatus("connected");
      })
      .catch((err) => {
        setMessage(`❌ Failed to connect: ${err.message}`);
        setStatus("error");
      });
  }, []);

  // 🚀 Run Sample Deadlock
  const handleRunDeadlock = async () => {
    setRunStatus("running");
    try {
      const result = await runSampleDeadlock();
      setRunStatus(`✅ ${result}`);
    } catch (err) {
      setRunStatus(`❌ Failed: ${err.message}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
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

      <p
        style={{
          color: status === "error" ? "#ff4d4d" : "#00ff99",
          marginBottom: "20px",
          textAlign: "center",
          maxWidth: "700px",
        }}
      >
        {message}
      </p>

      {/* ✅ This button was missing */}
      <button
        onClick={handleRunDeadlock}
        style={{
          backgroundColor: "#ff007f",
          border: "none",
          color: "white",
          padding: "12px 28px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0 0 10px rgba(255,0,128,0.4)",
        }}
      >
        🚀 Run Sample Deadlock
      </button>

      {runStatus && (
        <p
          style={{
            marginTop: "20px",
            color: runStatus.includes("❌") ? "#ff4d4d" : "#00ff99",
            fontWeight: "bold",
          }}
        >
          {runStatus}
        </p>
      )}
    </div>
  );
}

export default App;

