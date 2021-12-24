import { doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Calendar from "../../components/calendar/calendar";
import CurrentActions from "../currentActions/currentActions";
import SmallActions from "../smallActions/smallActions";
import CurrentActionsInfographics from "../currentActionsInfographics/currentActionsInfographics";
import styles from "./userArea.module.css";
import FirestoreContext from "../../context/FirebaseContext";
import UserDataContext from "../../context/UserDataContext";
import NavBar from "../navBar/navBar";

function UserArea() {
  const [userData, setUserData] = useState({});
  const [uid, setUid] = useState(null);
  const [signingOutIsTrue, setSigningOutIsTrue] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setSigningOutIsTrue(true);
    }
  });

  const firestore = useContext(FirestoreContext);

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(doc(firestore, "users", uid), (doc) => {
        setUserData((userData) => {
          userData = doc.data();
          return userData;
        });
      });

      return () => unsub();
    }
  }, [firestore, uid]);

  if (signingOutIsTrue) return <Navigate to="/welcome" />;

  return (
    <div className={styles.userArea}>
      {userData ? (
        <UserDataContext.Provider value={userData}>
          <NavBar setSigningOutIsTrue={setSigningOutIsTrue} />
          <Calendar />
          <SmallActions />
          <CurrentActions />
          <CurrentActionsInfographics />
        </UserDataContext.Provider>
      ) : null}

      <Outlet />
    </div>
  );
}

export default UserArea;
