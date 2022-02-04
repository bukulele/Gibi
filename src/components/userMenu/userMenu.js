import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePageContext from "../../context/HomePageContext";
import { getAuth, signOut } from "firebase/auth";
import Button from "../button/button";
import styles from "./userMenu.module.css";
import UserContext from "../../context/UserContext";
import { useTranslation } from "react-i18next";

function UserMenu({ showUserMenu, switchUserMenu }) {
  const user = useContext(UserContext);
  const isItHomePage = useContext(HomePageContext);

  const menuWrapperRef = useRef();

  const { t } = useTranslation();

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
            <Link to={`/${user.displayName}`}>
              {t("userArea.navBar.userMenu.myPage")}
            </Link>
          </li>
        )}
        <li>
          <Link to="/">{t("userArea.navBar.userMenu.settings")}</Link>
        </li>
        <li>
          <Button
            content={t("userArea.navBar.userMenu.signOut")}
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
