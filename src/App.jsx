import React, { useEffect, useState } from "react";
import API_BASE_URL, { runSampleDeadlock } from "./api";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [status, setStatus] = useState("loading");
  const [runStatus, setRunStatus] = useState("");

  // ✅ Check backend health on load
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
    setRunStatus("running...");
    try {
      const result = await runSampleDeadlock();
      setRunStatus(`✅ ${result}`);
      // Open live backend dashboard automatically
      window.open("https://deadlock-83kw.onrender.com", "_blank");
    } catch (err) {
      setRunStatus(`❌ Failed: ${err.message}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0b0b0b",
        color: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", marginBottom: "20px" }}>
        🧠 Java Deadlock Detection Dashboard
      </h1>

      <p
        style={{
          color: status === "error" ? "#ff4d4d" : "#00ff99",
          marginBottom: "30px",
          maxWidth: "700px",
        }}
      >
        {message}
      </p>

      {/* 🚀 Button to run sample deadlock */}
      <button
        onClick={handleRunDeadlock}
        style={{
          backgroundColor: "#ff007f",
          border: "none",
          color: "white",
          padding: "14px 32px",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          boxShadow: "0 0 20px rgba(255,0,128,0.4)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 0 25px rgba(255,0,128,0.6)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 0 20px rgba(255,0,128,0.4)";
        }}
      >
        🚀 Run Sample Deadlock
      </button>

      {runStatus && (
        <p
          style={{
            marginTop: "25px",
            color: runStatus.includes("❌") ? "#ff4d4d" : "#00ff99",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {runStatus}
        </p>
      )}
    </div>
  );
}

export default App;
