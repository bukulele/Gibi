import { Link } from "react-router-dom";
import styles from "./friends.module.css";

function Friends({ friendsList }) {
  const friends = friendsList.map((friend) => {
    return (
      <li key={friend} className={styles.friend}>
        <Link to={`/${friend}`}>{friend}</Link>
      </li>
    );
  });

  return (
    <ul className={styles.friends}>
      <h4>Subscription list</h4>
      {friends}
    </ul>
  );
}

export default Friends;
