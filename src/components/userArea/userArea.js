import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Calendar from "../../components/calendar/calendar";
import CurrentActions from "../currentActions/currentActions";
import SmallActions from "../smallActions/smallActions";
import styles from "./userArea.module.css";
import FirestoreContext from "../../context/FirebaseContext";
import UserDataContext from "../../context/UserDataContext";

function UserArea() {
  const [userData, setUserData] = useState({});

  const uid = JSON.parse(localStorage.getItem("uid"));
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

  if (!uid) {
    return <Navigate to="/welcome" />;
  }

  return (
    <div className={styles.userArea}>
      {userData ? (
        <UserDataContext.Provider value={userData}>
          <Calendar />
          <CurrentActions />
          <SmallActions />
        </UserDataContext.Provider>
      ) : null}

      <Outlet />
    </div>
  );
}

export default UserArea;
