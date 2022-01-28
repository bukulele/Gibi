import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePageContext from "../../context/HomePageContext";
import { getAuth, signOut } from "firebase/auth";
import Button from "../button/button";
import styles from "./userMenu.module.css";
import UserContext from "../../context/UserContext";

function UserMenu({ showUserMenu, switchUserMenu }) {
  const user = useContext(UserContext);
  const isItHomePage = useContext(HomePageContext);

  const menuWrapperRef = useRef();

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

  const clickHandler = (event) => {
    if (event.target === menuWrapperRef.current) switchUserMenu();
  };

  return (
    <div
      ref={menuWrapperRef}
      onClick={clickHandler}
      className={`${styles.userMenuWrapper} ${
        showUserMenu ? styles.showUserMenu : styles.hideUserMenu
      }`}
    >
      <ul className={styles.userMenu} onClick={switchUserMenu}>
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
