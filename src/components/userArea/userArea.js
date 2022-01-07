import { getAuth, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Calendar from "../../components/calendar/calendar";
import CurrentActions from "../currentActions/currentActions";
import SmallActions from "../smallActions/smallActions";
import CurrentActionsInfographics from "../currentActionsInfographics/currentActionsInfographics";
import styles from "./userArea.module.css";
import FirestoreContext from "../../context/FirebaseContext";
import UserDataContext from "../../context/UserDataContext";
import NavBar from "../navBar/navBar";
import UserIdContext from "../../context/UserIdContext";
import HomePageContext from "../../context/HomePageContext";

function UserArea({ verificationRequired }) {
  const [userData, setUserData] = useState(null);
  const [signingOutIsTrue, setSigningOutIsTrue] = useState(false);
  const [isItHomePage, setIsItHomePage] = useState(false);
  const [docName, setDocName] = useState(null);

  const uid = useContext(UserIdContext);
  const firestore = useContext(FirestoreContext);

  const auth = getAuth();

  const navigate = useNavigate();
  const params = useParams();

  getDoc(doc(firestore, "userNames", params.displayName))
    .then((response) => {
      return response.data();
    })
    .then((response) => setDocName(response.userId));

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Verification link has been sent to you. Please check your email.");
    });
  };

  useEffect(() => {
    if (uid === docName) {
      if (!verificationRequired) setIsItHomePage(true);
    } else {
      setIsItHomePage(false);
    }
  }, [docName, uid]);

  useEffect(() => {
    if (docName) {
      const unsub = onSnapshot(doc(firestore, "users", docName), (doc) => {
        setUserData((userData) => {
          userData = doc.data();
          return userData;
        });
      });

      return () => unsub();
    }
  }, [firestore, params, docName]);

  useEffect(() => {
    if (signingOutIsTrue) {
      navigate("/welcome");
    }
    return () => {
      setSigningOutIsTrue(false);
    };
  }, [signingOutIsTrue]);

  return (
    <div className={styles.userArea}>
      {userData ? (
        <HomePageContext.Provider value={isItHomePage}>
          <UserDataContext.Provider value={userData}>
            <NavBar
              verifyEmail={verificationRequired ? verifyEmail : null}
              setSigningOutIsTrue={setSigningOutIsTrue}
            />
            <Calendar />
            <SmallActions />
            <CurrentActions />
            <CurrentActionsInfographics />
          </UserDataContext.Provider>
        </HomePageContext.Provider>
      ) : null}

      <Outlet />
    </div>
  );
}

export default UserArea;
