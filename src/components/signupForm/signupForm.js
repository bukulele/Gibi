import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import userDataTemplate from "../../templates/userDataTemplate";
import { firestore } from "../../firebase/config";
import styles from "./signupForm.module.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  let userData = { ...userDataTemplate };

  const handleSubmit = (event) => {
    event.preventDefault();
    // firebase
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setEmail("");
        setPassword("");
        alert("Authentication done!");
        return response.user.uid;
      })
      .then((uid) => {
        userData.email = email;
        let collectionRef = doc(firestore, "users", uid);
        const docRef = setDoc(collectionRef, userData);
      })
      .then(() => setIsSignedUp(true))
      .catch((error) => alert(error.message));
  };

  if (isSignedUp) return <Navigate to="/welcome" />;

  return (
    <div className={styles.subsurface}>
      <Link to="/welcome">
        <div className={styles.exitButton}>
          <FontAwesomeIcon icon={faTimes} pointerEvents="none" />
        </div>
      </Link>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
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
        <button type="submit">Sign UP</button>
      </form>
    </div>
  );
}

export default SignupForm;
