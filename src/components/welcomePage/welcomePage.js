import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../button/button";
import styles from "./welcomePage.module.css";
import UserIdContext from "../../context/UserIdContext";

function WelcomePage({ displayName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const uid = useContext(UserIdContext);

  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/${displayName}`);
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

  return (
    <div className={styles.welcomePage}>
      <div className={styles.greetings}>Welcome to tracker!</div>
      {uid ? (
        <Button
          clickHandler={goHome}
          type="button"
          buttonStyle={styles.goHomeButton}
          content="Go to my page"
        />
      ) : (
        <>
          <div className={styles.signInForm}>
            <div className={styles.inputBlock}>
              <label htmlFor="email">email:</label>
              <input
                type="email"
                name="email"
                value={email}
                className={styles.input}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="password">password:</label>
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
                content="SignIn"
              />
            </div>
            <Link to="/signup">Create account</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default WelcomePage;
