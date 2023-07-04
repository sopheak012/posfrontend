import React, { useEffect } from "react";
import io from "socket.io-client";

let socket;

const SocketConnection = () => {
  useEffect(() => {
    socket = io("http://localhost:4000"); // Replace with your server URL

    // Handle connection events
    socket.on("connect", () => {
      console.log("Connected to the socket");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the socket");
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export { socket, SocketConnection };
