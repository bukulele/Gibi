import { setDoc, doc } from "firebase/firestore";
import { useState, useContext } from "react";
import Button from "../button/button";
import styles from "./addNewAction.module.css";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import FirestoreContext from "../../context/FirebaseContext";
import UserIdContext from "../../context/UserIdContext";
import { Emoji } from "emoji-mart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink, faTimes } from "@fortawesome/free-solid-svg-icons";

function AddNewCalendarAction({ chosenDate, changeModalVisibility }) {
  const [eventOfTheDay, setEventOfTheDay] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emodjiWindowIsVisible, setEmodjiWindowIsVisible] = useState(false);

  const firestore = useContext(FirestoreContext);
  const uid = useContext(UserIdContext);

  const showEmodjiWindow = () => {
    setEmodjiWindowIsVisible(!emodjiWindowIsVisible);
  };

  const addNewCalendarAction = (event) => {
    event.preventDefault();
    let data = {
      calendarActions: {
        [chosenDate.yearAndMonth]: {
          [chosenDate.day]: { event: eventOfTheDay, emoji: chosenEmoji },
        },
      },
    };
    let collectionRef = doc(firestore, "users", uid);
    const docRef = setDoc(collectionRef, data, { merge: true }).then(() =>
      changeModalVisibility(false)
    );
  };

  return (
    <form onSubmit={addNewCalendarAction} className={styles.addNewAction}>
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
              showEmodjiWindow();
            }}
            buttonStyle="removeEmoji"
            type="button"
            content="Remove emoji"
          />
          <Button
            clickHandler={showEmodjiWindow}
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
    </form>
  );
}

export default AddNewCalendarAction;
