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
  const [emailOk, setEmailOk] = useState(false);
  const [userNameOk, setUserNameOk] = useState(false);
  const [passwordOk, setPasswordOk] = useState(false);
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

  const checkEmail = () => {
    if (email.match(emailRegExp)) {
      setEmailOk(true);
    } else {
      setEmailOk(false);
    }
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

  const checkPassword = () => {
    if (password.match(passwordRegExp)) {
      setPasswordOk(true);
    } else {
      setPasswordOk(false);
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
    checkEmail();
  }, [email]);

  useEffect(() => {
    checkPassword();
  }, [password]);

  useEffect(() => {
    if (userNameOk && emailOk && passwordOk) {
      setReadyToSignUp(true);
    } else {
      setReadyToSignUp(false);
    }
  }, [userNameOk, emailOk, passwordOk]);

  return (
    <div className={styles.welcomePage}>
      <div className={styles.signUpForm}>
        <div className={styles.inputBlock}>
          <label htmlFor="email">{t("signUpArea.email")}:</label>
          <div className={styles.inputContainer}>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              pattern={emailRegExp}
              title={t("signUpArea.emailHint")}
              required
            ></input>
            <FontAwesomeIcon
              icon={emailOk ? faCheck : faTimes}
              color={emailOk ? "rgb(137, 142, 111)" : "rgb(116, 111, 142)"}
            />
          </div>
          {emailOk ? null : <p>{t("signUpArea.emailMessageWrong")}</p>}
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="userName">{t("signUpArea.userName")}:</label>
          <div className={styles.inputContainer}>
            <input
              id="userName"
              type="text"
              name="userName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              autoComplete="nickname"
              title={t("signUpArea.userNameHint")}
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
          {userNameOk ? null : <p>{t("signUpArea.userNameMessageWrong")}</p>}
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="password">{t("signUpArea.password")}:</label>
          <div className={styles.inputContainer}>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title={t("signUpArea.passwordHint")}
              required
            ></input>
            <FontAwesomeIcon
              icon={passwordOk ? faCheck : faTimes}
              color={passwordOk ? "rgb(137, 142, 111)" : "rgb(116, 111, 142)"}
            />
          </div>
          {passwordOk ? null : <p>{t("signUpArea.passwordMessageWrong")}</p>}
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
