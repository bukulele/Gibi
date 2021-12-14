import { useState } from "react";
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
import { Route, Routes } from "react-router-dom";
import AddNewCalendarAction from "../addNewAction/addNewCalendarAction";
import TodayAction from "../todayAction/todayAction";

function Calendar({
  currentMonth,
  currentYear,
  today,
  months,
  changeMonth,
  changeYear,
  uid,
  calendarActions,
}) {
  const [chosenDate, setChosenDate] = useState(null);
  const [objectToShow, setObjectToShow] = useState({});

  let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

  const calendarDateContent = (date, day) => {
    return calendarActions["" + date.getFullYear() + date.getMonth()]
      ? calendarActions["" + date.getFullYear() + date.getMonth()][
          day.toString()
        ]
        ? calendarActions["" + date.getFullYear() + date.getMonth()][
            day.toString()
          ]["emodji"]
          ? calendarActions["" + date.getFullYear() + date.getMonth()][
              day.toString()
            ]["emodji"]["emoji"]
          : day
        : day
      : day;
  };

  //Creating calendar body
  while (rowCount !== 7) {
    day = date.getDate();
    let currentDate =
      date.getFullYear() + " " + date.getMonth() + " " + date.getDate();
    dayNumbersArray.push(
      <CalendarDay
        key={date}
        todayEvent={
          calendarActions["" + date.getFullYear() + date.getMonth()]
            ? calendarActions["" + date.getFullYear() + date.getMonth()][
                day.toString()
              ]
              ? calendarActions["" + date.getFullYear() + date.getMonth()][
                  day.toString()
                ]
              : null
            : null
        }
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
        setObjectToShow={setObjectToShow}
        setChosenDate={setChosenDate}
        day={day}
      >
        {calendarDateContent(date, day)}
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
        <div>{months[currentMonth]}</div>

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
      <Routes>
        <Route
          path="addNewCalendarAction"
          element={
            <AddNewCalendarAction
              chosenDate={chosenDate}
              currentMonth={currentMonth}
              currentYear={currentYear}
              uid={uid}
            />
          }
        />
        <Route
          path="todayaction"
          element={<TodayAction actionObject={objectToShow} />}
        />
      </Routes>
    </div>
  );
}

export default Calendar;
