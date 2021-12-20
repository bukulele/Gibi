import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/welcomePage/welcomePage";
import UserArea from "./components/userArea/userArea";
import "./app.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserIdContext from "./context/UserIdContext";

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("uid", JSON.stringify(user.uid));
      } else {
        localStorage.removeItem("uid");
      }
      if (user) setUid(user.uid);
    });
  }, []);

  return (
    <UserIdContext.Provider value={uid}>
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to={uid ? "home" : "welcome"} />}
        />
        <Route path="home/*" element={<UserArea />} />
        <Route path="welcome/*" element={<WelcomePage setUid={setUid} />} />
      </Routes>
    </UserIdContext.Provider>
  );
}

export default App;
