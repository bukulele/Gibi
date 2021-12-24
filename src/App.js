import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/welcomePage/welcomePage";
import UserArea from "./components/userArea/userArea";
import "./app.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserIdContext from "./context/UserIdContext";

function App() {
  const [uid, setUid] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid(null);
    }
  });

  return (
    <UserIdContext.Provider value={uid}>
      <Routes>
        <Route exact path="/" element={<Navigate to="home" />} />
        <Route path="home/*" element={<UserArea />} />
        <Route path="welcome/*" element={<WelcomePage />} />
      </Routes>
    </UserIdContext.Provider>
  );
}

export default App;
