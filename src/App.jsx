import React, { useEffect, useState } from "react";
import client from "./websocket";
import API_BASE_URL, { runSampleDeadlock } from "./api";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [status, setStatus] = useState("loading");
  const [runStatus, setRunStatus] = useState("");
  const [deadlocks, setDeadlocks] = useState(0);
  const [isResolved, setIsResolved] = useState(false);

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

  // 🔄 WebSocket listener for live deadlock updates
  useEffect(() => {
    client.activate();

    client.onConnect = () => {
      console.log("🟢 Connected to WebSocket. Listening for /topic/deadlocks...");
      client.subscribe("/topic/deadlocks", (msg) => {
        console.log("📡 Live update:", msg.body);
        try {
          const data = JSON.parse(msg.body);

          if (data.event === "DEADLOCK_DETECTED") {
            setDeadlocks((prev) => prev + 1);
            setIsResolved(false);
            setRunStatus("⚠️ Deadlock Detected!");
          } else if (data.event === "DEADLOCK_RESOLVED") {
            setIsResolved(true);
            setDeadlocks(0);
            setRunStatus("✅ Deadlock Resolved!");
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      });
    };

    return () => {
      client.deactivate();
    };
  }, []);

  // 🚀 Trigger sample deadlock
  const handleRunDeadlock = async () => {
    setRunStatus("running...");
    try {
      const result = await runSampleDeadlock();
      setRunStatus(`✅ ${result}`);
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
        transition: "background-color 0.5s ease",
      }}
    >
      <h1 style={{ fontSize: "2.3rem", marginBottom: "20px" }}>
        🧠 Java Deadlock Detection Dashboard
      </h1>

      <p
        style={{
          color: status === "error" ? "#ff4d4d" : "#00ff99",
          marginBottom: "25px",
        }}
      >
        {message}
      </p>

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
          marginBottom: "25px",
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
            marginTop: "10px",
            color: runStatus.includes("⚠️")
              ? "#ffcc00"
              : runStatus.includes("❌")
              ? "#ff4d4d"
              : "#00ff99",
            fontWeight: "bold",
            fontSize: "18px",
            transition: "color 0.5s ease",
          }}
        >
          {runStatus}
        </p>
      )}

      {/* Show live count of deadlocks */}
      <div
        style={{
          marginTop: "30px",
          fontSize: "20px",
          color: isResolved ? "#00ff99" : "#ff4d4d",
          fontWeight: "bold",
        }}
      >
        {isResolved
          ? "✅ System Stable — No Deadlocks"
          : `🧩 Active Deadlocks: ${deadlocks}`}
      </div>
    </div>
  );
}

export default App;


