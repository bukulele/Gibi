import { getAuth, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "../../components/calendar/calendar";
import CurrentActions from "../currentActions/currentActions";
import SmallActions from "../smallActions/smallActions";
import CurrentActionsInfographics from "../currentActionsInfographics/currentActionsInfographics";
import styles from "./userArea.module.css";
import FirestoreContext from "../../context/FirebaseContext";
import UserDataContext from "../../context/UserDataContext";
import NavBar from "../navBar/navBar";
import Friends from "../friends/friends";
import UserContext from "../../context/UserContext";
import HomePageContext from "../../context/HomePageContext";

function UserArea({ verificationRequired }) {
  const [userData, setUserData] = useState(null);
  const [isItHomePage, setIsItHomePage] = useState(false);
  const [friendsList, setFriendsList] = useState([]);

  const user = useContext(UserContext);
  const firestore = useContext(FirestoreContext);

  const auth = getAuth();
  const params = useParams();

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Verification link has been sent to you. Please check your email.");
    });
  };

  useEffect(() => {
    if (user?.displayName === params.displayName) {
      if (!verificationRequired) setIsItHomePage(true);
    } else {
      setIsItHomePage(false);
    }
  }, [params, user]);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(firestore, "users", params.displayName),
      (doc) => {
        setUserData((userData) => {
          userData = doc.data();
          return userData;
        });
      }
    );

    return () => unsub();
  }, [params]);

  useEffect(() => {
    if (isItHomePage && userData) {
      setFriendsList([...userData.friends]);
    } else {
      getDoc(doc(firestore, "users", params.displayName))
        .then((doc) => doc.data())
        .then((data) => {
          setFriendsList([...data.friends]);
        });
    }
  }, [isItHomePage, params, userData]);

  return (
    <div className={styles.userArea}>
      {userData ? (
        <HomePageContext.Provider value={isItHomePage}>
          <UserDataContext.Provider value={userData}>
            <NavBar
              friendsList={friendsList}
              showingName={params.displayName}
              verifyEmail={verificationRequired ? verifyEmail : null}
            />
            {user ? <Friends friendsList={friendsList} /> : null}
            <Calendar />
            <SmallActions />
            <CurrentActions />
            <CurrentActionsInfographics />
          </UserDataContext.Provider>
        </HomePageContext.Provider>
      ) : null}
    </div>
  );
}

export default UserArea;
