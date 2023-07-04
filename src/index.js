import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { SocketConnection } from "./socket/SocketConnection";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketConnection />
      <App />
    </Provider>
  </React.StrictMode>
);
