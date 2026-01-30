import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";

import { AppProvider } from "./stores/AppContext.jsx";


import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const Router =
  import.meta.env.VITE_ROUTER === "hash"
    ? HashRouter
    : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <Router>
      <App />
    </Router>
  </AppProvider>
);

