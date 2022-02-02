import { useState } from "react";
import TodayAction from "../todayAction/todayAction";
import ModalWindow from "../modalWindow/modalWindow";
import styles from "./calendarDay.module.css";
import { Emoji } from "emoji-mart";
import WarningModal from "../modalWindow/warningModal";

function CalendarDay({ style, dayColor, todayEvents, today, day, date }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [showDay, setShowDay] = useState(false);
  const [warningModalVisibility, setWarningModalVisibility] = useState(false);
  const [hasUnsavedData, setHasUnsavedData] = useState(false);

  const closeModal = () => {
    if (modalVisibility && hasUnsavedData) {
      showWarning();
    } else {
      setModalVisibility(false);
    }
  };

  const showWarning = () => {
    setWarningModalVisibility(true);
  };

  const hideWarning = () => {
    setWarningModalVisibility(false);
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
        onClick={() => setModalVisibility(true)}
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
        changeModalVisibility={closeModal}
      >
        {
          <TodayAction
            setHasUnsavedData={setHasUnsavedData}
            date={date}
            todayEvents={todayEvents}
            chosenDate={today}
            changeModalVisibility={closeModal}
          />
        }
      </ModalWindow>
      <WarningModal
        setModalVisibility={setModalVisibility}
        setHasUnsavedData={setHasUnsavedData}
        hideWarning={hideWarning}
        warningModalVisibility={warningModalVisibility}
      />
    </>
  );
}

export default CalendarDay;
