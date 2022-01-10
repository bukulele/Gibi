import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePageContext from "../../context/HomePageContext";
import { getAuth, signOut } from "firebase/auth";
import Button from "../button/button";
import styles from "./userMenu.module.css";

function UserMenu({ showUserMenu }) {
  const isItHomePage = useContext(HomePageContext);
  const [signingOutIsTrue, setSigningOutIsTrue] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    if (signingOutIsTrue) {
      navigate("/");
    }
    return () => {
      setSigningOutIsTrue(false);
    };
  }, [signingOutIsTrue]);

  return (
    <ul
      className={`${styles.userMenu} ${
        showUserMenu ? styles.showUserMenu : styles.hideUserMenu
      }`}
    >
      {isItHomePage ? null : (
        <li>
          <Link to="/">Go to my page</Link>
        </li>
      )}
      <li>
        <Link to="/">Settings</Link>
      </li>
      <li>
        <Button
          content="Sign Out"
          clickHandler={userSignOut}
          type="button"
          buttonStyle={styles.signOutButton}
        />
      </li>
    </ul>
  );
}

export default UserMenu;
