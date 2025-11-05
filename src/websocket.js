import { Client } from "@stomp/stompjs";

const SOCKET_URL = `${import.meta.env.VITE_API_BASE_URL || "https://deadlock-83kw.onrender.com"}/ws`;

const client = new Client({
  brokerURL: SOCKET_URL.replace("http", "ws"),
  reconnectDelay: 5000,
  onConnect: () => {
    console.log("🟢 Connected to WebSocket server");
  },
  onStompError: (frame) => {
    console.error("❌ WebSocket error:", frame.headers["message"]);
  },
});

export default client;

