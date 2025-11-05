import React, { useEffect, useState } from "react";
import API_BASE_URL from "./api";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`)
      .then(res => res.text())
      .then(data => setMessage(`✅ Backend connected: ${data}`))
      .catch(err => setMessage(`❌ Connection failed: ${err}`));
  }, []);

  return (
    <div style={{
      backgroundColor: "#111",
      color: "#fff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial",
    }}>
      <h1>🧠 Java Deadlock Detection Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;

