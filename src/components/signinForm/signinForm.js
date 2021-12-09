import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./signinForm.module.css";

function SigninForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        onSuccess(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code: ${errorCode} error message: ${errorMessage}`);
      });
    return;
  };

  if (isLoggedIn) return <Navigate to="/home" />;
  return (
    <div className={styles.subsurface}>
      <Link to="/welcome">
        <div className={styles.exitButton}>
          <FontAwesomeIcon icon={faTimes} pointerEvents="none" />
        </div>
      </Link>
      <form onSubmit={handleSubmit} className={styles.signinForm}>
        <label htmlFor="email">EMAIL</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SigninForm;
