import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// Import Semantic UI CSS and our custom overrides
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import store from "./app/store";
import "./index.css";
import "./semantic-ui/semantic-overrides.css"; // This file contains our custom styles that override Semantic UI defaults
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
