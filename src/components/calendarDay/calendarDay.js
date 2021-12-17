import { useState } from "react";
import TodayAction from "../todayAction/todayAction";
import ModalWindow from "../modalWindow/modalWindow";
import styles from "./calendarDay.module.css";
import { Emoji } from "emoji-mart";

function CalendarDay({ style, dayColor, todayEvents, today, day }) {
  const [modalVisibility, setModalVisibility] = useState(false);

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
      >
        {todayEvents?.emoji ? (
          <Emoji emoji={todayEvents.emoji} size={25} />
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
