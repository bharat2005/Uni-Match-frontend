import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("wss://api.uni-match.in", { path: "/socket.io/" });
 // Change this to your server IP

function App() {
  useEffect(() => {
    // When connected
    socket.on("connect", () => {
      console.log("Connected to WebSocket server!");
      socket.send("Hello from React!"); // Send message when connected
    });

    // When receiving a message
    socket.on("message", (data) => {
      console.log("Received:", data);
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Test</h1>
      <button onClick={() => socket.send("Hello Flask!")}>
        Send Message
      </button>
    </div>
  );
}

export default App;
