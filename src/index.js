import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FirestoreContext from "./context/FirebaseContext";
import { firestore } from "./firebase/config";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <FirestoreContext.Provider value={firestore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirestoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
