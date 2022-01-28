import { useContext, useEffect, useRef, useState } from "react";
import UserDataContext from "../../context/UserDataContext";
import { Emoji } from "emoji-mart";
import styles from "./calendarActions.module.css";
import HomePageContext from "../../context/HomePageContext";

function CalendarActions() {
  const userData = useContext(UserDataContext);
  const isItHomePage = useContext(HomePageContext);
  const [calendarActions, setCalendarActions] = useState({});
  const [indexToFocus, setIndexToFocus] = useState(0);

  const refsArr = useRef([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const datesArray = [];

  const calendarActionsList = Object.values(calendarActions)
    .reverse()
    .map((value) =>
      Object.values(value)
        .reverse()
        .map((value) =>
          Object.values(value)
            .reverse()
            .map((element, index) => {
              const date = element.date;
              const checkDate = new Date(Date.parse(date));
              const emoji = element.emoji;
              const list = element.events.map((event, index) => (
                <div key={event + index} className={styles.action}>
                  {event}
                </div>
              ));
              datesArray.push(checkDate);
              return (
                <li
                  tabIndex={-1}
                  key={element + index}
                  className={styles.oneDay}
                  ref={(element) => refsArr.current.push(element)}
                >
                  <div className={styles.date}>{date}</div>
                  <div className={styles.emoji}>
                    {emoji ? <Emoji emoji={emoji} size={40} /> : null}
                  </div>
                  <div className={styles.list}>{list}</div>
                </li>
              );
            })
        )
    );

  useEffect(() => {
    setCalendarActions({ ...userData.calendarActions });
  }, [userData]);

  useEffect(() => {
    for (let i = 0; i < datesArray.length - 1; i++) {
      if (
        datesArray[i + 1].getTime() < datesArray[i].getTime() &&
        datesArray[i + 1].getTime() >= today.getTime()
      ) {
        setIndexToFocus(i + 1);
      }
    }
  }, [datesArray]);

  useEffect(() => {
    if (refsArr.current[indexToFocus]) refsArr.current[indexToFocus].focus();
  }, [indexToFocus]);

  return (
    <div className={styles.smallActionsWindow}>
      <div className={styles.calendarActionsHeader}>
        <h4>
          {isItHomePage ? "Your" : `${userData.userName}'s`} plans (detailed)
        </h4>
      </div>

      <ul className={styles.smallActionsList}>{calendarActionsList}</ul>
    </div>
  );
}

export default CalendarActions;
