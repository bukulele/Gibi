import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import styles from "./verificationWindow.module.css";

function VerificationWindow() {
  const auth = getAuth();
  const navigate = useNavigate();

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Verification link has been sent to you. Please check your email.");
    });
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={styles.verificationWindow}>
      <h3>In order to start using Gibi, please verify your email first.</h3>
      <div className={styles.buttons}>
        <Button
          clickHandler={verifyEmail}
          type="button"
          buttonStyle={styles.verifyEmailButton}
          content="Verify email"
        />
        <Button
          content="Sign Out"
          clickHandler={userSignOut}
          type="button"
          buttonStyle={styles.signOutButton}
        />
      </div>
    </div>
  );
}

export default VerificationWindow;
