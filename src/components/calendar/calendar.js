import styles from "./calendar.module.css";
import CalendarDay from "./calendar-day/calendarDay";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

function Calendar({
  currentMonth,
  currentYear,
  today,
  months,
  changeMonth,
  changeYear,
}) {
  let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let rowCount = 1;
  let columnCount = 1;
  let day = 1;
  let date = new Date(currentYear, currentMonth, day);
  let firstWeekDay = date.getDay() === 0 ? 7 : date.getDay();
  date.setDate(day - firstWeekDay + 1);

  let dayNumbersArray = [];
  let weekDayArray = [];

  //Creating header of calendar with week days
  for (let i = 0; i < 7; i++) {
    weekDayArray.push(
      <div
        style={{
          gridColumnStart: i + 1,
          gridColumnEnd: i + 2,
          gridRowStart: 1,
          gridRowEnd: 2,
        }}
        key={weekDays[i]}
        className={styles.weekDay}
      >
        {weekDays[i]}
      </div>
    );
  }

  //Creating calendar body
  while (rowCount !== 7) {
    day = date.getDate();
    let currentDate =
      date.getFullYear() + " " + date.getMonth() + " " + date.getDate();
    dayNumbersArray.push(
      <CalendarDay
        key={date}
        style={{
          gridColumnStart: columnCount,
          gridColumnEnd: columnCount + 1,
          gridRowStart: rowCount,
          gridRowEnd: rowCount + 1,
        }}
        dayColor={
          date.getMonth() === currentMonth
            ? currentDate === today
              ? "today"
              : "black"
            : "grey"
        }
        thisDate={date.toString()}
      >
        {day}
      </CalendarDay>
    );
    if (columnCount === 7) {
      columnCount = 1;
      rowCount++;
    } else {
      columnCount++;
    }
    day++;
    date.setDate(day);
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarControlBlock}>
        <Button
          id="decrease-year"
          content={
            <FontAwesomeIcon icon={faAngleDoubleLeft} pointerEvents="none" />
          }
          clickHandler={changeYear}
          buttonType="calendarButton"
        />
        <Button
          id="decrease-month"
          content={<FontAwesomeIcon icon={faAngleLeft} pointerEvents="none" />}
          clickHandler={changeMonth}
          buttonType="calendarButton"
        />
        <div>{months[currentMonth]}</div>
        <div>{currentYear}</div>
        <Button
          id="increase-month"
          content={<FontAwesomeIcon icon={faAngleRight} pointerEvents="none" />}
          clickHandler={changeMonth}
          buttonType="calendarButton"
        />
        <Button
          id="increase-year"
          content={
            <FontAwesomeIcon icon={faAngleDoubleRight} pointerEvents="none" />
          }
          clickHandler={changeYear}
          buttonType="calendarButton"
        />
      </div>

      <div className={styles.calendarWeekDays}>{weekDayArray}</div>
      <div className={styles.calendarDayNumbers}>{dayNumbersArray}</div>
    </div>
  );
}

export default Calendar;
