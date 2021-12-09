import styles from "./calendarDay.module.css";

function CalendarDay({ style, children, thisDate, dayColor }) {
  const handleClick = () => {
    console.log(thisDate);
  };
  return (
    <div
      className={`${styles.calendarDay} ${styles[dayColor]}`}
      style={style}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default CalendarDay;
