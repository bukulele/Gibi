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
import FirestoreContext from "../../context/FirestoreContext";
import UserDataContext from "../../context/UserDataContext";
import UserImage from "../userImage/userImage";

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
      {userData.photoURL && !isItHomePage ? (
        <UserImage userImage={userData.photoURL} />
      ) : null}
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
          content={<UserImage userImage={user.photoURL} />}
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
