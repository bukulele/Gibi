import { useContext, useEffect, useRef, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import styles from "./userSettings.module.css";
import FirestoreContext from "../../context/FirestoreContext";
import ImageEditorArea from "../imageEditor/imageEditorArea";
import { useTranslation } from "react-i18next";
import Button from "../button/button";
import ModalWindow from "../modalWindow/modalWindow";
import ChangeEmailForm from "../changeEmailForm/changeEmailForm";
import ChangePasswordForm from "../changePasswordForm/changePasswordForm";
import ChangeSubscriptions from "../subscriptions/changeSubscriptions";

function UserSettings() {
  const user = useContext(UserContext);
  const firestore = useContext(FirestoreContext);
  const [userData, setUserData] = useState(null);
  const [passwordModalVisibility, setPasswordModalVisibility] = useState(false);
  const [emailModalVisibility, setEmailModalVisibility] = useState(false);
  const [showSubscriptionsListModal, setShowSubscriptionsListModal] =
    useState(false);

  const pensilRef = useRef();

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  // const changeCursor = () => {};

  const changePassword = () => {
    setPasswordModalVisibility(true);
  };

  const changePasswordModalVisibility = () => {
    setPasswordModalVisibility(!passwordModalVisibility);
  };

  const changeEmailModalVisibility = () => {
    setEmailModalVisibility(!emailModalVisibility);
  };

  const showPensilButton = (event) => {
    event.stopPropagation();
    pensilRef.current = event.target;
    pensilRef.current.lastChild.style = "display: flex";
  };

  const hidePensilButton = () => {
    pensilRef.current.lastChild.style = "display: none";
  };

  const languageChanged = (lang) => {
    const userDocsRef = doc(firestore, "users", user.displayName);
    userData.language = lang;
    setDoc(userDocsRef, userData).catch((error) => alert(error.message));
  };

  const changeSubscriptionsVisibility = () => {
    setShowSubscriptionsListModal(!showSubscriptionsListModal);
  };

  const goHome = () => {
    navigate(`/${user.displayName}`);
  };

  useEffect(() => {
    if (user?.displayName) {
      onSnapshot(doc(firestore, "users", user.displayName), (doc) => {
        setUserData(doc.data());
      });
    }
  }, [user]);

  return (
    <div className={styles.userSettingsBackground}>
      <div className={styles.userSettingsWindow}>
        {userData ? (
          <>
            <h2 className={styles.header}>
              {t("settings.settingsWindow.header")}
            </h2>
            <div className={styles.userPhoto}>
              <ImageEditorArea userData={userData} />
            </div>
            <div className={styles.userName}>
              <h3>{t("settings.settingsWindow.userName")}</h3>
              <p>{user.displayName}</p>
            </div>
            <div
              className={styles.userEmail}
              ref={pensilRef}
              onMouseEnter={showPensilButton}
              onMouseLeave={hidePensilButton}
            >
              <h3>{t("settings.settingsWindow.userEmail")}</h3>
              <p>{user.email}</p>
              <Button
                content={
                  <FontAwesomeIcon icon={faPencilAlt} pointerEvents="none" />
                }
                clickHandler={changeEmailModalVisibility}
                buttonStyle={styles.pencilButton}
                type="button"
              />
            </div>
            <div className={styles.userSubscriptions}>
              <Button
                content={t("settings.settingsWindow.userSubscriptions")}
                clickHandler={changeSubscriptionsVisibility}
                buttonStyle={styles.settingsButton}
                type="button"
              />
            </div>
            <div className={styles.userLanguage}>
              <h3>{t("settings.settingsWindow.userLanguage")}</h3>
              <div className={styles.langButtons}>
                <Button
                  clickHandler={() => {
                    i18n.changeLanguage("en");
                    languageChanged("en");
                  }}
                  type="button"
                  buttonStyle={`${styles.chooseLangButton} ${
                    i18n.resolvedLanguage === "en"
                      ? styles.chosenLang
                      : styles.otherLang
                  }`}
                  content="Eng"
                />
                /
                <Button
                  clickHandler={() => {
                    i18n.changeLanguage("ru");
                    languageChanged("ru");
                  }}
                  type="button"
                  buttonStyle={`${styles.chooseLangButton} ${
                    i18n.resolvedLanguage === "ru"
                      ? styles.chosenLang
                      : styles.otherLang
                  }`}
                  content="Рус"
                />
              </div>
            </div>
            {/* <div className={styles.userCursor}>
              <Button
                content={t("settings.settingsWindow.userCursor")}
                clickHandler={changeCursor}
                buttonStyle={styles.changeCursor}
                type="button"
              />
            </div> */}
            <div className={styles.userPassword}>
              <Button
                content={t("settings.settingsWindow.userPassword")}
                clickHandler={changePassword}
                buttonStyle={styles.settingsButton}
                type="button"
              />
            </div>
            <div className={styles.buttons}>
              <Button
                content={t("settings.settingsWindow.goHomeButton")}
                clickHandler={goHome}
                buttonStyle={styles.goHomeButton}
                type="button"
              />
            </div>
            <ModalWindow
              visibility={emailModalVisibility}
              changeModalVisibility={changeEmailModalVisibility}
            >
              <ChangeEmailForm
                changeModalVisibility={changeEmailModalVisibility}
              />
            </ModalWindow>
            <ModalWindow
              visibility={passwordModalVisibility}
              changeModalVisibility={changePasswordModalVisibility}
            >
              <ChangePasswordForm
                changeModalVisibility={changePasswordModalVisibility}
              />
            </ModalWindow>
            <ModalWindow
              visibility={showSubscriptionsListModal}
              changeModalVisibility={changeSubscriptionsVisibility}
            >
              <ChangeSubscriptions
                friendsList={userData.friends}
                changeModalVisibility={changeSubscriptionsVisibility}
              />
            </ModalWindow>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserSettings;
