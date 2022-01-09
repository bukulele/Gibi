import { useContext } from "react";
import { Link } from "react-router-dom";
import UserDataContext from "../../context/UserDataContext";
import styles from "./friends.module.css";

function Friends() {
  const userData = useContext(UserDataContext);

  const friendsList = userData.friends.map((friend) => {
    return (
      <li key={friend} className={styles.friend}>
        <Link to={`/${friend}`}>{friend}</Link>
      </li>
    );
  });
  return (
    <ul className={styles.friends}>
      <h4>Subscription list</h4>
      {friendsList}
    </ul>
  );
}

export default Friends;
