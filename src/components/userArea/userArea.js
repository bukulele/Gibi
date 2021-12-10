import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    console.log(`current month: ${currentMonth}
    current year: ${currentYear}`);
  }, [currentMonth, currentYear]);

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
