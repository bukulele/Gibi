import { setDoc, doc } from "firebase/firestore";
import { useState, useContext, useEffect, useRef, useReducer } from "react";
import Button from "../button/button";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Emoji } from "emoji-mart";
import styles from "./todayAction.module.css";
import FirestoreContext from "../../context/FirebaseContext";
import UserIdContext from "../../context/UserIdContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmileWink,
  faTimes,
  faMinusCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import currentActionsReducer from "../../reducer/currentActionsReducer";

function TodayAction({ todayEvents, chosenDate }) {
  const eventRef = useRef();
  const newEventRef = useRef();

  const [todayEventsArray, changeTodayEventsArray] = useReducer(
    currentActionsReducer,
    []
  );
  const [eventOfTheDay, setEventOfTheDay] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emodjiWindowIsVisible, setEmodjiWindowIsVisible] = useState(false);
  const [showAddEventButton, setShowAddEventButton] = useState(false);

  const firestore = useContext(FirestoreContext);
  const uid = useContext(UserIdContext);

  const showEmojiWindow = () => {
    setEmodjiWindowIsVisible(!emodjiWindowIsVisible);
  };

  const confirmChanges = () => {
    let data = {
      calendarActions: {
        [chosenDate.yearAndMonth]: {
          [chosenDate.day]: {
            events: [...todayEventsArray],
            emoji: chosenEmoji,
          },
        },
      },
    };
    let collectionRef = doc(firestore, "users", uid);
    const docRef = setDoc(collectionRef, data, { merge: true }).then(() => {
      setEventOfTheDay("");
    });
  };

  const addNewAction = () => {
    changeTodayEventsArray({ type: "ADD", event: eventOfTheDay });
    setEventOfTheDay("");
  };

  const showDeleteButton = (event) => {
    eventRef.current = event.target;
    eventRef.current.lastChild.style = "display: flex";
  };

  const hideDeleteButton = () => {
    eventRef.current.lastChild.style = "display: none";
  };

  const showConfirmChangesButton = () => {
    if (
      todayEvents?.emoji?.id !== chosenEmoji?.id ||
      eventOfTheDay !== "" ||
      (todayEventsArray.length > 0 &&
        todayEventsArray.length !== todayEvents?.events?.length) ||
      todayEventsArray.some(
        (element, index) => element !== todayEvents?.events[index]
      )
    ) {
      return (
        <Button
          clickHandler={confirmChanges}
          buttonStyle={styles.addCalendarAction}
          type="button"
          content="Confirm changes"
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (eventOfTheDay !== "") {
      setShowAddEventButton(true);
    } else {
      setShowAddEventButton(false);
    }
  }, [eventOfTheDay]);

  useEffect(() => {
    changeTodayEventsArray({ type: "CLEAR" });
    if (todayEvents?.emoji) {
      setChosenEmoji(todayEvents.emoji);
    }
    if (todayEvents?.events) {
      todayEvents.events.map((event) =>
        changeTodayEventsArray({ type: "ADD", event: event })
      );
    }
  }, [todayEvents]);

  const listArray = todayEventsArray.map((event, index) => (
    <li
      key={event + index}
      ref={eventRef}
      onMouseEnter={showDeleteButton}
      onMouseLeave={hideDeleteButton}
    >
      {event}
      <Button
        id={index}
        clickHandler={() =>
          changeTodayEventsArray({
            type: "REMOVE",
            id: eventRef.current.lastChild.id,
          })
        }
        content={<FontAwesomeIcon icon={faMinusCircle} pointerEvents="none" />}
        buttonStyle={styles.deleteEvent}
        type="button"
      />
    </li>
  ));

  return (
    <div className={styles.todayActions}>
      <Button
        clickHandler={showEmojiWindow}
        content={
          chosenEmoji ? (
            <Emoji emoji={chosenEmoji} size={30} />
          ) : (
            <FontAwesomeIcon icon={faSmileWink} pointerEvents="none" />
          )
        }
        buttonStyle={styles.emojiButton}
        type="button"
      />
      <ul className={styles.events}>{listArray}</ul>
      <div className={styles.newInput}>
        <input
          ref={newEventRef}
          className={styles.eventInput}
          type="text"
          name="event"
          placeholder="Something interesting today?"
          value={eventOfTheDay}
          onChange={(event) => setEventOfTheDay(event.target.value)}
        />
        <Button
          clickHandler={addNewAction}
          content={
            <FontAwesomeIcon icon={faCheckCircle} pointerEvents="none" />
          }
          buttonStyle={`${styles.addEventButton} ${
            showAddEventButton
              ? styles.addEventButtonShow
              : styles.addEventButtonHide
          }`}
          type="button"
        />
      </div>
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
            buttonStyle={styles.removeEmoji}
            type="button"
            content="Remove emoji"
          />
          <Button
            clickHandler={showEmojiWindow}
            buttonStyle={styles.closeEmojiPickerButton}
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
      {showConfirmChangesButton()}
    </div>
  );
}

export default TodayAction;
