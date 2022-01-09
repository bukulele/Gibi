import Button from "../button/button";
import UserMenu from "../userMenu/userMenu";
import styles from "./navBar.module.css";
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import HomePageContext from "../../context/HomePageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import UserIdContext from "../../context/UserIdContext";
import FirestoreContext from "../../context/FirebaseContext";
import UserDataContext from "../../context/UserDataContext";

function NavBar({ verifyEmail, displayName }) {
  const isItHomePage = useContext(HomePageContext);
  const userData = useContext(UserDataContext);

  const uid = useContext(UserIdContext);
  const firestore = useContext(FirestoreContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [friendInList, setFriendInList] = useState(true);

  const switchUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const addFriend = () => {
    let collectionRef = doc(firestore, "users", uid);
    updateDoc(collectionRef, "friends", arrayUnion(displayName)).then(() => {
      setFriendInList(true);
      alert(`${displayName} added to friends list`);
    });
  };

  useEffect(() => {
    if (uid) {
      getDoc(doc(firestore, "users", uid))
        .then((response) => {
          return response.data();
        })
        .then((response) =>
          setFriendInList(response.friends.includes(displayName))
        );
    }
  }, [uid, userData]);

  return (
    <div
      className={`${styles.navBar} ${
        isItHomePage ? styles.navHome : styles.navGuest
      }`}
    >
      {!isItHomePage && !friendInList ? (
        <Button
          content={<FontAwesomeIcon icon={faUserPlus} pointerEvents="none" />}
          clickHandler={addFriend}
          type="button"
          buttonStyle={styles.addFriendButton}
        />
      ) : null}
      <div className={styles.displayName}>{displayName}</div>
      {verifyEmail ? (
        <Button
          clickHandler={verifyEmail}
          type="button"
          buttonStyle={styles.goHomeButton}
          content="Verify email"
        />
      ) : null}
      <Button
        content={<FontAwesomeIcon icon={faUser} pointerEvents="none" />}
        clickHandler={switchUserMenu}
        type="button"
        buttonStyle={styles.userMenuButton}
      />
      <UserMenu showUserMenu={showUserMenu} />
    </div>
  );
}
export default NavBar;
