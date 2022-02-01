import { setDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import FirestoreContext from "../../context/FirebaseContext";
import UserContext from "../../context/UserContext";
import UserDataContext from "../../context/UserDataContext";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./changeSmallWidget.module.css";

function ChangeSmallWidget({
  headerToChange,
  contentToChange,
  changeModalVisibility,
  index,
}) {
  const user = useContext(UserContext);
  const firestore = useContext(FirestoreContext);
  const userData = useContext(UserDataContext);
  const [header, setHeader] = useState(headerToChange);
  const [content, setContent] = useState(contentToChange);
  const [showChangeWidgetButton, setShowChangeWidgetButton] = useState(false);
  const [widgetsArray, setWidgetsArray] = useState([]);
  const [readyToUpdate, setReadyToUpdate] = useState(false);

  const changeWidget = () => {
    setWidgetsArray((prevArray) => {
      prevArray[index].header = header;
      prevArray[index].content = content;
      prevArray[index].dateModified = new Date();
      return prevArray;
    });
    setReadyToUpdate(true);
  };

  const deleteWidget = () => {
    setWidgetsArray((prevArray) => {
      prevArray.splice(index, 1);
      return prevArray;
    });
    setReadyToUpdate(true);
  };

  useEffect(() => {
    if (userData) setWidgetsArray(userData.smallWidgets);
  }, [userData]);

  useEffect(() => {
    if (
      (header.length > 0 && content.length > 0 && header !== headerToChange) ||
      (header.length > 0 && content.length > 0 && content !== contentToChange)
    ) {
      setShowChangeWidgetButton(true);
    } else {
      setShowChangeWidgetButton(false);
    }
  }, [header, content]);

  useEffect(() => {
    if (readyToUpdate) {
      const data = {
        smallWidgets: widgetsArray,
      };
      const collectionRef = doc(firestore, "users", user.displayName);
      setDoc(collectionRef, data, { merge: true }).catch((error) =>
        alert(error.message)
      );
      changeModalVisibility();
    }
    return () => setReadyToUpdate(false);
  }, [readyToUpdate]);

  return (
    <div className={styles.changeSmallWidget}>
      <input
        type="text"
        name="header"
        value={header}
        onChange={(event) => setHeader(event.target.value)}
        placeholder="Just one interesting thing"
      ></input>
      <textarea
        maxLength={200}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Specify it here!"
      ></textarea>
      <Button
        clickHandler={changeWidget}
        content={"Change"}
        buttonStyle={`${styles.changeWidgetButton} ${
          showChangeWidgetButton
            ? styles.changeWidgetButtonShow
            : styles.changeWidgetButtonHide
        }`}
        type="button"
      />
      <Button
        clickHandler={deleteWidget}
        content={<FontAwesomeIcon icon={faTrashAlt} pointerEvents="none" />}
        buttonStyle={styles.deleteWidgetButton}
        type="button"
      />
    </div>
  );
}

export default ChangeSmallWidget;
