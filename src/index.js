import React from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./ServiceWorker";

ReactDOM.render(
    <React.StrictMode>
    <div className="container">
       <App />
    </div>
  </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();