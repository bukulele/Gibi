import Button from "../button/button";
import { getAuth, signOut } from "firebase/auth";
import styles from "./navBar.module.css";
import { Navigate } from "react-router-dom";

function NavBar({ setSigningOutIsTrue }) {
  const userSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setSigningOutIsTrue(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={styles.navBar}>
      <Button
        content="Sign out"
        clickHandler={userSignOut}
        type="button"
        buttonStyle="signOutButton"
      />
    </div>
  );
}
export default NavBar;
