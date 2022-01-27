import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePageContext from "../../context/HomePageContext";
import { getAuth, signOut } from "firebase/auth";
import Button from "../button/button";
import styles from "./userMenu.module.css";
import UserContext from "../../context/UserContext";

function UserMenu({ showUserMenu, switchUserMenu }) {
  const user = useContext(UserContext);
  const isItHomePage = useContext(HomePageContext);

  const navigate = useNavigate();

  const userSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div
      onClick={switchUserMenu}
      className={`${styles.userMenuWrapper} ${
        showUserMenu ? styles.showUserMenu : styles.hideUserMenu
      }`}
    >
      <ul className={styles.userMenu}>
        {isItHomePage ? null : (
          <li>
            <Link to={`/${user.displayName}`}>Go to my page</Link>
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
    </div>
  );
}

export default UserMenu;
