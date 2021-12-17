import { useContext, useState } from "react";
import styles from "./calendar.module.css";
import CalendarDay from "../calendarDay/calendarDay";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import UserDataContext from "../../context/UserDataContext";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(todayIs().getMonth());
  const [currentYear, setCurrentYear] = useState(todayIs().getFullYear());

  const TODAY =
    todayIs().getFullYear() +
    " " +
    todayIs().getMonth() +
    " " +
    todayIs().getDate();

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const changeMonth = (event) => {
    if (event.target.id === "decrease-month") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((currentYear) => currentYear - 1);
      } else {
        setCurrentMonth((currentMonth) => currentMonth - 1);
      }
    }
    if (event.target.id === "increase-month") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((currentYear) => currentYear + 1);
      } else {
        setCurrentMonth((currentMonth) => currentMonth + 1);
      }
    }
  };

  const changeYear = (event) => {
    if (event.target.id === "decrease-year") {
      setCurrentYear((currentYear) => currentYear - 1);
    }
    if (event.target.id === "increase-year") {
      setCurrentYear((currentYear) => currentYear + 1);
    }
  };

  function todayIs() {
    let today = new Date();
    return today;
  }

  const userData = useContext(UserDataContext);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let rowCount = 1;
  let columnCount = 1;
  let day = 1;
  let date = new Date(currentYear, currentMonth, day);
  let firstWeekDay = date.getDay() === 0 ? 7 : date.getDay();
  date.setDate(day - firstWeekDay + 1);

  let dayNumbersArray = [];
  let weekDayArray = [];
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

  // const calendarDateContent = (date, day) => {
  //   return (
  //     userData?.calendarActions?.["" + date.getFullYear() + date.getMonth()]?.[
  //       day.toString()
  //     ]?.["emoji"] || day
  //   );
  // };

  //Creating calendar body
  while (rowCount !== 7) {
    day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth();
    let currentDate = year + " " + month + " " + day;
    dayNumbersArray.push(
      <CalendarDay
        key={date}
        day={day}
        today={{ yearAndMonth: "" + year + month, day: day }}
        todayEvents={
          userData?.calendarActions?.["" + year + month]?.[day.toString()] ||
          null
        }
        style={{
          gridColumnStart: columnCount,
          gridColumnEnd: columnCount + 1,
          gridRowStart: rowCount,
          gridRowEnd: rowCount + 1,
        }}
        dayColor={
          month === currentMonth
            ? currentDate === TODAY
              ? "today"
              : "black"
            : "grey"
        }
      ></CalendarDay>
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
      <div className={styles.upperCalendarButtons}>
        <Button
          content="Today"
          type="button"
          buttonStyle="todayButton"
          clickHandler={() => {
            setCurrentMonth(todayIs().getMonth());
            setCurrentYear(todayIs().getFullYear());
          }}
        />
      </div>
      <div className={styles.calendarControlBlock}>
        <Button
          id="decrease-year"
          content={
            <FontAwesomeIcon icon={faAngleDoubleLeft} pointerEvents="none" />
          }
          clickHandler={changeYear}
          buttonStyle="calendarButton"
          type="button"
        />
        <div>{currentYear}</div>
        <Button
          id="increase-year"
          content={
            <FontAwesomeIcon icon={faAngleDoubleRight} pointerEvents="none" />
          }
          clickHandler={changeYear}
          buttonStyle="calendarButton"
          type="button"
        />
        <Button
          id="decrease-month"
          content={<FontAwesomeIcon icon={faAngleLeft} pointerEvents="none" />}
          clickHandler={changeMonth}
          buttonStyle="calendarButton"
          type="button"
        />
        <div>{MONTHS[currentMonth]}</div>

        <Button
          id="increase-month"
          content={<FontAwesomeIcon icon={faAngleRight} pointerEvents="none" />}
          clickHandler={changeMonth}
          buttonStyle="calendarButton"
          type="button"
        />
      </div>
      <div className={styles.calendarWeekDays}>{weekDayArray}</div>
      <div className={styles.calendarDayNumbers}>{dayNumbersArray}</div>
    </div>
  );
}

export default Calendar;
