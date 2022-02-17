import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsisH,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import userDataTemplate from "../../templates/userDataTemplate";
import styles from "./signUpArea.module.css";
import FirestoreContext from "../../context/FirestoreContext";
import { useTranslation } from "react-i18next";

function SignUpArea() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameOk, setUserNameOk] = useState(false);
  const [timer, setTimer] = useState(null);
  const [readyToSignUp, setReadyToSignUp] = useState(false);

  const firestore = useContext(FirestoreContext);
  const auth = getAuth();

  const userData = { ...userDataTemplate };

  const { t } = useTranslation();

  const navigate = useNavigate();

  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  const usernameRegExp = /^[a-z0-9]+$/;

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: userName,
        });
      })
      .then(() => {
        userData.email = email;
        userData.userName = userName;
        const userDocsRef = doc(firestore, "users", userName);
        setDoc(userDocsRef, userData);
      })
      .then(() => {
        setEmail("");
        setPassword("");
        setUserName("");
        alert("Authentication done!");
      })
      .then(() => navigate("/"))
      .catch((error) => alert(error.message));
  };

  const checkUserName = () => {
    if (userName.match(usernameRegExp) && userName.length >= 5) {
      getDoc(doc(firestore, "users", userName)).then((docSnap) => {
        if (docSnap.exists()) {
          setUserNameOk(false);
        } else {
          setUserNameOk(true);
        }
      });
    } else {
      setUserNameOk(false);
    }
  };

  useEffect(() => {
    if (timer) clearTimeout(timer);
    if (userName.length < 5) {
      setUserNameOk(false);
    } else {
      setUserNameOk("wait");
      setTimer(setTimeout(checkUserName, 500));
    }
  }, [userName]);

  useEffect(() => {
    if (
      userNameOk === true &&
      email.match(emailRegExp) &&
      password.match(passwordRegExp)
    ) {
      setReadyToSignUp(true);
    } else {
      setReadyToSignUp(false);
    }
  }, [userNameOk, email, password]);

  return (
    <div className={styles.welcomePage}>
      <div className={styles.signUpForm}>
        <div className={styles.inputBlock}>
          <label htmlFor="email">{t("signUpArea.email")}:</label>
          <input
            type="email"
            name="email"
            value={email}
            className={styles.input}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            pattern={emailRegExp}
            title={t("signUpArea.emailMessage")}
            required
          ></input>
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="userName">{t("signUpArea.userName")}:</label>
          <div className={styles.userNameInput}>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              autoComplete="nickname"
              title={t("signUpArea.userNameMessage")}
              pattern={usernameRegExp}
              required
            ></input>
            <FontAwesomeIcon
              icon={
                userNameOk === true
                  ? faCheck
                  : userNameOk === false
                  ? faTimes
                  : faEllipsisH
              }
              color={
                userNameOk === true
                  ? "rgb(137, 142, 111)"
                  : userNameOk === false
                  ? "rgb(116, 111, 142)"
                  : "#a1a1a1"
              }
            />
          </div>
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="password">{t("signUpArea.password")}:</label>
          <input
            type="password"
            name="password"
            value={password}
            className={styles.input}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title={t("signUpArea.passwordMessage")}
            required
          ></input>
        </div>
        <div className={styles.buttonsBlock}>
          <Button
            clickHandler={readyToSignUp ? signUp : null}
            type="button"
            buttonStyle={
              readyToSignUp ? styles.signUpButton : styles.signUpButtonInactive
            }
            content={t("signUpArea.signUp")}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpArea;
