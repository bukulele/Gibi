import { Link } from "react-router-dom";
import styles from "./calendarDay.module.css";

function CalendarDay({
  style,
  setObjectToShow,
  dayColor,
  todayEvent,
  children,
  setChosenDate,
  year,
  month,
  day,
}) {
  const handleClick = () => {
    setObjectToShow(todayEvent);
    setChosenDate({ yearAndMonth: "" + year + month, day: day });
  };
  return (
    <div
      className={
        todayEvent
          ? `${styles.calendarDay} ${styles[dayColor]} ${styles.todayEvent}`
          : `${styles.calendarDay} ${styles[dayColor]}`
      }
      style={style}
      onClick={handleClick}
    >
      {todayEvent ? (
        <Link to="todayaction">{children}</Link>
      ) : (
        <Link to="addNewCalendarAction">{children}</Link>
      )}
    </div>
  );
}

export default CalendarDay;
