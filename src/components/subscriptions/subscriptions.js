import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./subscriptions.module.css";

function Subscriptions({
  showSubscriptionsList,
  friendsList,
  changeSubscriptionsVisibility,
}) {
  const subscriptionsRef = useRef();

  const clickHandler = (event) => {
    if (event.target === subscriptionsRef.current)
      changeSubscriptionsVisibility();
  };

  const friends = friendsList.map((friend) => {
    return (
      <li key={friend} className={styles.friend}>
        <Link to={`/${friend}`}>{friend}</Link>
      </li>
    );
  });

  return (
    <div
      ref={subscriptionsRef}
      onClick={clickHandler}
      className={`${styles.subscriptionsWrapper} ${
        showSubscriptionsList ? styles.subscriptionsVisible : ""
      }`}
    >
      <div className={styles.subscriptions}>
        <div className={styles.subscriptionsHeader}>
          <h4>Subscriptions</h4>
        </div>
        <ul>{friends}</ul>
      </div>
    </div>
  );
}

export default Subscriptions;
