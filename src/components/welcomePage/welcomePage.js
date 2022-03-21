import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import Button from "../button/button";
import styles from "./welcomePage.module.css";
import UserContext from "../../context/UserContext";
import logo from "../../misc/gibi_face.png";
import { useTranslation } from "react-i18next";
import ModalWindow from "../modalWindow/modalWindow";

function WelcomePage() {
  const user = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/${user.displayName}`);
  };

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        navigate(`/${response.user.displayName}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code: ${errorCode} error message: ${errorMessage}`);
      });
    return;
  };

  const userSignOut = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      alert(error);
    });
  };

  const showRestoreModalWindow = () => {
    setShowRestoreModal(!showRestoreModal);
  };

  const restorePassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setShowRestoreModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.welcomePage}>
      <div className={styles.langButtons}>
        <Button
          clickHandler={() => {
            i18n.changeLanguage("en");
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
      <div className={styles.greetings}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h1>{t("welcomePage.greetings")}, Gibi!</h1>
      </div>
      {user ? (
        <div className={styles.buttons}>
          <Button
            clickHandler={goHome}
            type="button"
            buttonStyle={styles.goHomeButton}
            content={t("welcomePage.enterButton")}
          />
          <Button
            clickHandler={userSignOut}
            type="button"
            buttonStyle={styles.signOutButton}
            content={t("welcomePage.signOutButton")}
          />
        </div>
      ) : (
        <>
          <div className={styles.signInForm}>
            <div className={styles.inputBlock}>
              <label htmlFor="email">{t("welcomePage.email")}:</label>
              <input
                type="email"
                name="email"
                value={email}
                className={styles.input}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="password">{t("welcomePage.password")}:</label>
              <input
                type="password"
                name="password"
                value={password}
                className={styles.input}
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
            <div className={styles.buttonsBlock}>
              <Button
                clickHandler={signIn}
                type="button"
                buttonStyle={styles.signInButton}
                content={t("welcomePage.signIn")}
              />
              <Button
                clickHandler={showRestoreModalWindow}
                type="button"
                buttonStyle={styles.restorePasswordButton}
                content={t("welcomePage.restorePassword")}
              />
            </div>
            <Link to="/signup">{t("welcomePage.createAccount")}</Link>
          </div>
          <ModalWindow
            visibility={showRestoreModal}
            changeModalVisibility={setShowRestoreModal}
          >
            {
              <>
                <div className={styles.inputBlock}>
                  <label htmlFor="email">{t("welcomePage.email")}:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className={styles.input}
                    onChange={(event) => setEmail(event.target.value)}
                  ></input>
                </div>
                <p>{t("welcomePage.restorePasswordWindow")}</p>
                <div className={styles.buttonsBlock}>
                  <Button
                    clickHandler={restorePassword}
                    type="button"
                    buttonStyle={styles.restorePasswordButton}
                    content={t("welcomePage.restorePassword")}
                  />
                  <Button
                    clickHandler={showRestoreModalWindow}
                    type="button"
                    buttonStyle={styles.cancelButton}
                    content={t("welcomePage.cancelButton")}
                  />
                </div>
              </>
            }
          </ModalWindow>
        </>
      )}
    </div>
  );
}

export default WelcomePage;
