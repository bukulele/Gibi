import { Link } from "react-router-dom";
import styles from "./subscriptions.module.css";

function Subscriptions({
  showSubscriptionsList,
  friendsList,
  changeSubscriptionsVisibility,
}) {
  const friends = friendsList.map((friend) => {
    return (
      <li key={friend} className={styles.friend}>
        <Link to={`/${friend}`}>{friend}</Link>
      </li>
    );
  });

  return (
    <div
      onClick={changeSubscriptionsVisibility}
      className={`${styles.subscriptionsWrapper} ${
        showSubscriptionsList ? styles.subscriptionsVisible : ""
      }`}
    >
      <ul className={styles.subscriptions}>
        <h4>Subscriptions</h4>
        {friends}
      </ul>
    </div>
  );
}

export default Subscriptions;
