import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/welcomePage/welcomePage";
import UserArea from "./components/userArea/userArea";
import SignUpArea from "./components/signupForm/signUpArea";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase/config";
import UserContext from "./context/UserContext";
import FirestoreContext from "./context/FirebaseContext";

function App() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [verificationRequired, setVerificationRequired] = useState(false);

  const firebase = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebase);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setUser(user);
          setDisplayName(user.displayName);
        } else {
          setVerificationRequired(true);
          setUser(user);
          setDisplayName(user.displayName);
        }
      } else {
        setUser(null);
        setDisplayName(null);
      }
    });
  }, [auth]);

  return (
    <FirestoreContext.Provider value={firestore}>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route
            path="welcome/*"
            element={<WelcomePage displayName={displayName} />}
          />
          <Route
            path=":displayName/*"
            element={<UserArea verificationRequired={verificationRequired} />}
          />
          <Route path="signup" element={<SignUpArea />} />
        </Routes>
      </UserContext.Provider>
    </FirestoreContext.Provider>
  );
}

export default App;
