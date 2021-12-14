import { Link } from "react-router-dom";
import styles from "./calendarDay.module.css";

function CalendarDay({
  style,
  children,
  thisDate,
  setChosenDate,
  dayColor,
  todayEvent,
}) {
  const handleClick = () => {
    setChosenDate(thisDate);
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
