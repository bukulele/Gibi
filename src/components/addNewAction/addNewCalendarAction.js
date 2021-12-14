import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { useRef, useState, useEffect } from "react";
import Button from "../button/button";
import { Link, Navigate } from "react-router-dom";
import styles from "./addNewAction.module.css";
import Picker from "emoji-picker-react";

function AddNewCalendarAction({ chosenDate, uid }) {
  const [eventOfTheDay, setEventOfTheDay] = useState("");
  const [isDataSent, setIsDataSent] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emodjiWindowIsVisible, setEmodjiWindowIsVisible] = useState(false);

  const refEmodji = useRef();

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const showEmodjiWindow = () => {
    setEmodjiWindowIsVisible(!emodjiWindowIsVisible);
    if (!emodjiWindowIsVisible) {
      refEmodji.current.style = "display: block";
    } else {
      refEmodji.current.style = "display: none";
    }
  };

  const addNewCalendarAction = (event) => {
    event.preventDefault();
    let data = {
      calendarActions: {
        [chosenDate.yearAndMonth]: {
          [chosenDate.day]: { event: eventOfTheDay, emodji: chosenEmoji },
        },
      },
    };
    let collectionRef = doc(firestore, "users", uid);
    const docRef = setDoc(collectionRef, data, { merge: true }).then(() =>
      setIsDataSent(true)
    );
  };

  if (isDataSent) return <Navigate to="/" />;

  return (
    <div className={styles.calendarSubsurface}>
      <form
        onSubmit={addNewCalendarAction}
        className={styles.addNewCalendarAction}
      >
        <input
          className={styles.eventInput}
          type="text"
          name="category"
          placeholder="What is your event of the day?"
          value={eventOfTheDay}
          onChange={(event) => setEventOfTheDay(event.target.value)}
        ></input>
        <Button
          id="addCalendarAction"
          clickHandler={showEmodjiWindow}
          content={chosenEmoji ? chosenEmoji.emoji : " =| "}
          buttonStyle="emodjiButton"
          type="button"
        />
        <div className={styles.emojiWindow} ref={refEmodji}>
          <div className={styles.chosenEmojiBlock}>
            {chosenEmoji ? (
              <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
              <span>No emoji Chosen</span>
            )}
            <Button
              id="addCalendarAction"
              clickHandler={showEmodjiWindow}
              content="X"
              buttonStyle="emodjiButton"
              type="button"
            />
          </div>

          <Picker
            onEmojiClick={onEmojiClick}
            groupVisibility={{ recently_used: false }}
            disableSearchBar={true}
            pickerStyle={{ height: "100%" }}
          />
        </div>
        <div className={styles.addButtonsBlock}>
          <Link to="/home">
            <div className={styles.cancelButton}>Cancel</div>
          </Link>
          <Button
            id="addCalendarAction"
            content="ADD"
            buttonStyle="submitButton"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default AddNewCalendarAction;
