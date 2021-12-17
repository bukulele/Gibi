import { setDoc, doc } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import Button from "../button/button";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Emoji } from "emoji-mart";
import styles from "./todayAction.module.css";
import FirestoreContext from "../../context/FirebaseContext";
import UserIdContext from "../../context/UserIdContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink, faTimes } from "@fortawesome/free-solid-svg-icons";

function TodayAction({ todayEvents, chosenDate }) {
  const [todayEventsArray, setTodayEventsArray] = useState([]);
  const [eventOfTheDay, setEventOfTheDay] = useState("");
  const [listOfEvents, setListOfEvents] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emodjiWindowIsVisible, setEmodjiWindowIsVisible] = useState(false);

  const showEmojiWindow = () => {
    setEmodjiWindowIsVisible(!emodjiWindowIsVisible);
  };

  const firestore = useContext(FirestoreContext);
  const uid = useContext(UserIdContext);

  const addNewCalendarAction = () => {
    let data = {
      calendarActions: {
        [chosenDate.yearAndMonth]: {
          [chosenDate.day]: {
            [eventOfTheDay !== "" ? "events" : null]: [
              ...todayEventsArray,
              eventOfTheDay,
            ],
            emoji: chosenEmoji,
          },
        },
      },
    };
    let collectionRef = doc(firestore, "users", uid);
    const docRef = setDoc(collectionRef, data, { merge: true }).then(() =>
      setEventOfTheDay("")
    );
  };

  useEffect(() => {
    if (todayEvents?.emoji) {
      setChosenEmoji(todayEvents.emoji);
    }
    if (todayEvents?.events) {
      setTodayEventsArray([...todayEvents.events]);
    }
  }, [todayEvents]);

  useEffect(() => {
    const listArray = todayEventsArray.map((event, index) => (
      <li key={event + index}>{event}</li>
    ));
    setListOfEvents([...listArray]);
  }, [todayEventsArray]);

  return (
    <div className={styles.todayActions}>
      <Button
        clickHandler={showEmojiWindow}
        content={
          chosenEmoji ? (
            <Emoji emoji={chosenEmoji} size={30} />
          ) : (
            <FontAwesomeIcon icon={faSmileWink} />
          )
        }
        buttonStyle="emojiButton"
        type="button"
      />
      <ul className={styles.events}>{listOfEvents}</ul>
      <input
        className={styles.eventInput}
        type="text"
        name="event"
        placeholder="Something interesting today?"
        value={eventOfTheDay}
        onChange={(event) => setEventOfTheDay(event.target.value)}
      ></input>
      <div
        className={`${styles.emojiWindow} ${
          emodjiWindowIsVisible
            ? styles.emodjiWindowIsVisible
            : styles.emodjiWindowIsHidden
        }`}
      >
        <div className={styles.upperButtonsBlock}>
          <Button
            clickHandler={() => {
              setChosenEmoji(null);
              showEmojiWindow();
            }}
            buttonStyle="removeEmoji"
            type="button"
            content="Remove emoji"
          />
          <Button
            clickHandler={showEmojiWindow}
            buttonStyle="closeEmojiPickerButton"
            type="button"
            content={<FontAwesomeIcon icon={faTimes} pointerEvents="none" />}
          />
        </div>
        <Picker
          set="apple"
          showPreview={false}
          showSkinTones={false}
          onSelect={(emoji) => {
            setChosenEmoji(emoji);
            setEmodjiWindowIsVisible(!emodjiWindowIsVisible);
          }}
        />
      </div>
      {todayEvents?.emoji?.id !== chosenEmoji?.id || eventOfTheDay !== "" ? (
        <Button
          clickHandler={addNewCalendarAction}
          buttonStyle="addCalendarAction"
          type="button"
          content="Confirm changes"
        />
      ) : null}
    </div>
  );
}

export default TodayAction;
