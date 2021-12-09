import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/welcomePage/welcomePage";
import UserArea from "./components/userArea/userArea";
import "./app.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("uid", JSON.stringify(user.uid));
      } else {
        localStorage.removeItem("uid");
      }
      setUser(user);
    });
  }, [user]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Navigate to={localStorage.uid ? "home" : "welcome"} />}
      />
      <Route path="home/*" element={<UserArea user={user} />} />
      <Route path="welcome/*" element={<WelcomePage setUser={setUser} />} />
    </Routes>
  );
}

export default App;
