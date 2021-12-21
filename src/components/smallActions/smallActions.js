import { useContext, useEffect, useState } from "react";
import UserDataContext from "../../context/UserDataContext";
import { Emoji } from "emoji-mart";
import styles from "./smallActions.module.css";

function SmallActions() {
  const userData = useContext(UserDataContext);
  const [calendarActions, setCalendarActions] = useState([]);

  const calendarActionsList = Object.values(calendarActions)
    .reverse()
    .map((value) =>
      Object.values(value)
        .reverse()
        .map((element, index) => {
          const date = element.date;
          const emoji = element.emoji;
          const list = element.events.map((event, index) => (
            <div key={event + index} className={styles.action}>
              {event}
            </div>
          ));
          return (
            <li key={element + index} className={styles.oneDay}>
              <div className={styles.date}>{date}</div>
              <div className={styles.emoji}>
                {emoji ? <Emoji emoji={emoji} size={40} /> : null}
              </div>
              <div className={styles.list}>{list}</div>
            </li>
          );
        })
    );
  useEffect(() => {
    setCalendarActions({ ...userData.calendarActions });
  }, [userData]);

  return (
    <div className={styles.smallActionsWindow}>
      <h3>Here are all the actions you added to calendar</h3>
      <ul className={styles.smallActionsList}>{calendarActionsList}</ul>
    </div>
  );
}

export default SmallActions;
