import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "../../components/calendar/calendar";
import CurrentActions from "../currentActions/currentActions";
import CalendarActions from "../calendarActions/calendarActions";
import CurrentActionsInfographics from "../currentActionsInfographics/currentActionsInfographics";
import styles from "./userArea.module.css";
import FirestoreContext from "../../context/FirestoreContext";
import UserDataContext from "../../context/UserDataContext";
import NavBar from "../navBar/navBar";
import Subscriptions from "../subscriptions/subscriptions";
import UserContext from "../../context/UserContext";
import HomePageContext from "../../context/HomePageContext";
import ModalWindow from "../modalWindow/modalWindow";
import VerificationWindow from "../verificationPage/verificationWindow";
import Button from "../button/button";
import Footer from "../footer/footer";
import SmallWidgetsArea from "../smallWidgetsArea/smallWidgetsArea";
import { useTranslation } from "react-i18next";

function UserArea() {
  const [userData, setUserData] = useState(null);
  const [isItHomePage, setIsItHomePage] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSubscriptionsList, setShowSubscriptionsList] = useState(false);

  const user = useContext(UserContext);
  const firestore = useContext(FirestoreContext);

  const params = useParams();

  const { t } = useTranslation();

  const closeVerificationModal = () => {
    if (user.emailVerified) setShowVerificationModal(false);
  };

  const changeSubscriptionsVisibility = () => {
    setShowSubscriptionsList(!showSubscriptionsList);
  };

  useEffect(() => {
    if (user?.displayName === params.displayName) {
      setIsItHomePage(true);
    } else {
      setIsItHomePage(false);
    }
  }, [params.displayName, user]);

  useEffect(() => {
    if (params.displayName) {
      onSnapshot(doc(firestore, "users", params.displayName), (doc) => {
        setUserData(doc.data());
      });
    }
  }, [params.displayName]);

  useEffect(() => {
    if (user?.displayName) {
      onSnapshot(doc(firestore, "users", user.displayName), (doc) => {
        setFriendsList(doc.data().friends);
      });
    }
  }, [userData]);

  useEffect(() => {
    if (user && !user.emailVerified) setShowVerificationModal(true);
  }, [user]);

  useEffect(() => {
    setShowSubscriptionsList(false);
  }, [userData]);

  return (
    <div className={styles.userArea}>
      {userData ? (
        <HomePageContext.Provider value={isItHomePage}>
          <UserDataContext.Provider value={userData}>
            <NavBar
              friendsList={friendsList}
              showingName={params.displayName}
            />
            <div className={styles.userLogoBig}></div>
            {user ? (
              <>
                <Button
                  clickHandler={changeSubscriptionsVisibility}
                  buttonStyle={styles.callSubscriptionsButton}
                  type="button"
                  content={t("userArea.subscriptions.header")}
                />
                <Subscriptions
                  changeSubscriptionsVisibility={changeSubscriptionsVisibility}
                  showSubscriptionsList={showSubscriptionsList}
                  friendsList={friendsList}
                />
              </>
            ) : null}
            <Calendar />
            <CalendarActions />
            <CurrentActions />
            <CurrentActionsInfographics />
            <SmallWidgetsArea />
            <ModalWindow
              visibility={showVerificationModal}
              changeModalVisibility={closeVerificationModal}
            >
              <VerificationWindow />
            </ModalWindow>
            <Footer />
          </UserDataContext.Provider>
        </HomePageContext.Provider>
      ) : null}
    </div>
  );
}

export default UserArea;
