import React, { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import WelcomePage from "./components/welcomePage/welcomePage";
import UserArea from "./components/userArea/userArea";
import SignUpArea from "./components/signupForm/signUpArea";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase/config";
import UserIdContext from "./context/UserIdContext";
import FirestoreContext from "./context/FirebaseContext";

function App() {
  const [uid, setUid] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [verificationRequired, setVerificationRequired] = useState(false);

  const firebase = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebase);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        setUid(user.uid);
        setDisplayName(user.displayName);
      } else {
        setVerificationRequired(true);
        setUid(user.uid);
        setDisplayName(user.displayName);
      }
    } else {
      setUid(null);
      setDisplayName(null);
    }
  });

  return (
    <FirestoreContext.Provider value={firestore}>
      <UserIdContext.Provider value={uid}>
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
      </UserIdContext.Provider>
    </FirestoreContext.Provider>
  );
}

export default App;
