import Button from "../button/button";
import { getAuth, signOut } from "firebase/auth";
import styles from "./navBar.module.css";
import { useContext } from "react";
import HomePageContext from "../../context/HomePageContext";

function NavBar({ verifyEmail, setSigningOutIsTrue }) {
  const isItHomePage = useContext(HomePageContext);

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
    <div className={isItHomePage ? styles.navBarHome : styles.navBarGuest}>
      {verifyEmail ? (
        <Button
          clickHandler={verifyEmail}
          type="button"
          buttonStyle={styles.goHomeButton}
          content="Verify email"
        />
      ) : null}
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
