import Button from "../button/button";
import UserMenu from "../userMenu/userMenu";
import styles from "./navBar.module.css";
import { Link } from "react-router-dom";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import HomePageContext from "../../context/HomePageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import FirestoreContext from "../../context/FirebaseContext";
import UserDataContext from "../../context/UserDataContext";
import logo from "../../misc/gibi_face.png";

function NavBar({ friendsList, showingName }) {
  const isItHomePage = useContext(HomePageContext);
  const userData = useContext(UserDataContext);
  const user = useContext(UserContext);
  const firestore = useContext(FirestoreContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [friendInList, setFriendInList] = useState(true);

  const switchUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const addFriend = () => {
    let collectionRef = doc(firestore, "users", user.displayName);
    updateDoc(collectionRef, "friends", arrayUnion(showingName)).then(() => {
      setFriendInList(true);
      alert(`${showingName} added to friends list`);
    });
  };

  useEffect(() => {
    setFriendInList(friendsList.includes(showingName));
  }, [userData, friendsList]);

  return (
    <div
      className={`${styles.navBar} ${
        isItHomePage ? styles.navHome : styles.navGuest
      }`}
    >
      <Link className={styles.homeLink} to="/">
        Gibi
      </Link>
      {user && !isItHomePage && !friendInList ? (
        <Button
          content={<FontAwesomeIcon icon={faUserPlus} pointerEvents="none" />}
          clickHandler={addFriend}
          type="button"
          buttonStyle={styles.addFriendButton}
        />
      ) : null}
      <div className={styles.displayName}>{showingName}</div>
      {user ? (
        <Button
          content={<img className={styles.logo} src={logo} alt="logo" />}
          clickHandler={switchUserMenu}
          type="button"
          buttonStyle={styles.userMenuButton}
        />
      ) : null}
      {user ? (
        <UserMenu switchUserMenu={switchUserMenu} showUserMenu={showUserMenu} />
      ) : null}
    </div>
  );
}
export default NavBar;
