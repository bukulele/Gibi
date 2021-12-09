import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Calendar from "../../components/calendar/calendar";
import CurrentActions from "../currentActions/currentActions";
import UserInfo from "../smallActions/smallActions";
import styles from "./userArea.module.css";
import { Navigate } from "react-router-dom";

function UserArea() {
  const [currentMonth, setCurrentMonth] = useState(todayIs().getMonth());
  const [currentYear, setCurrentYear] = useState(todayIs().getFullYear());
  const uid = JSON.parse(localStorage.getItem("uid"));

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
      setCurrentMonth((currentMonth) => {
        if (currentMonth === 0) {
          setCurrentYear((currentYear) => currentYear - 1);
          return 11;
        }
        return currentMonth - 1;
      });
    }
    if (event.target.id === "increase-month") {
      setCurrentMonth((currentMonth) => {
        if (currentMonth === 11) {
          setCurrentYear((currentYear) => currentYear + 1);
          return 0;
        }
        return currentMonth + 1;
      });
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

  if (!localStorage.uid) {
    return <Navigate to="/welcome" />;
  }

  return (
    <div className={styles.userArea}>
      <Calendar
        currentMonth={currentMonth}
        currentYear={currentYear}
        today={TODAY}
        months={MONTHS}
        changeMonth={changeMonth}
        changeYear={changeYear}
      />
      <CurrentActions uid={uid} />
      <UserInfo uid={uid} />
      <Outlet />
    </div>
  );
}

export default UserArea;
