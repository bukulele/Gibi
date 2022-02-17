import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/welcomePage/welcomePage";
import UserArea from "./components/userArea/userArea";
import SignUpArea from "./components/signupForm/signUpArea";
import UserSettings from "./components/userSettings/userSettings";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebase/config";
import UserContext from "./context/UserContext";
import FirestoreContext from "./context/FirestoreContext";
import StorageContext from "./context/StorageContext";

function App() {
  const [user, setUser] = useState(null);

  const firebase = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebase);
  const storage = getStorage(firebase);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  return (
    <FirestoreContext.Provider value={firestore}>
      <StorageContext.Provider value={storage}>
        <UserContext.Provider value={user}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route path="welcome/*" element={<WelcomePage />} />
            <Route path=":displayName/*" element={<UserArea />} />
            <Route path="signup" element={<SignUpArea />} />
            <Route path="settings" element={<UserSettings />} />
          </Routes>
        </UserContext.Provider>
      </StorageContext.Provider>
    </FirestoreContext.Provider>
  );
}

export default App;
