import { useState } from "react";
import TodayAction from "../todayAction/todayAction";
import ModalWindow from "../modalWindow/modalWindow";
import styles from "./calendarDay.module.css";
import { Emoji } from "emoji-mart";

function CalendarDay({ style, dayColor, todayEvents, today, day, date }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [showDay, setShowDay] = useState(false);

  const changeModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <>
      <div
        className={
          todayEvents
            ? `${styles.calendarDay} ${styles[dayColor]} ${styles.todayEvent}`
            : `${styles.calendarDay} ${styles[dayColor]}`
        }
        style={style}
        onClick={changeModalVisibility}
        onMouseEnter={() => setShowDay(true)}
        onMouseLeave={() => setShowDay(false)}
      >
        {todayEvents?.emoji ? (
          showDay ? (
            day
          ) : (
            <Emoji emoji={todayEvents.emoji} size={25} />
          )
        ) : (
          day
        )}
      </div>
      <ModalWindow
        visibility={modalVisibility}
        changeModalVisibility={changeModalVisibility}
      >
        {
          <TodayAction
            date={date}
            todayEvents={todayEvents}
            chosenDate={today}
            changeModalVisibility={changeModalVisibility}
          />
        }
      </ModalWindow>
    </>
  );
}

export default CalendarDay;
