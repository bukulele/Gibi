import { setDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import FirestoreContext from "../../context/FirestoreContext";
import UserContext from "../../context/UserContext";
import UserDataContext from "../../context/UserDataContext";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./changeSmallWidget.module.css";
import { useTranslation } from "react-i18next";

function ChangeSmallWidget({
  headerToChange,
  contentToChange,
  changeModalVisibility,
  index,
  setHasUnsavedData,
  hasUnsavedData,
}) {
  const user = useContext(UserContext);
  const firestore = useContext(FirestoreContext);
  const userData = useContext(UserDataContext);
  const [header, setHeader] = useState(headerToChange);
  const [content, setContent] = useState(contentToChange);
  const [showChangeWidgetButton, setShowChangeWidgetButton] = useState(false);
  const [widgetsArray, setWidgetsArray] = useState([]);
  const [readyToUpdate, setReadyToUpdate] = useState(false);

  const { t } = useTranslation();

  const changeWidget = () => {
    setWidgetsArray((prevArray) => {
      prevArray[index].header = header;
      prevArray[index].content = content;
      prevArray[index].dateModified = new Date();
      return prevArray;
    });
    setHasUnsavedData(false);
    setReadyToUpdate(true);
  };

  const deleteWidget = () => {
    setWidgetsArray((prevArray) => {
      prevArray.splice(index, 1);
      return prevArray;
    });
    setHasUnsavedData(false);
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
    if (readyToUpdate && !hasUnsavedData) {
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
  }, [readyToUpdate, hasUnsavedData]);

  useEffect(() => {
    if (showChangeWidgetButton) {
      setHasUnsavedData(true);
    } else {
      setHasUnsavedData(false);
    }
  }, [showChangeWidgetButton]);

  return (
    <div className={styles.changeSmallWidget}>
      <input
        type="text"
        name="header"
        value={header}
        onChange={(event) => setHeader(event.target.value)}
        placeholder={t("userArea.smallWidgetsArea.changeSmallWidget.header")}
        maxLength={150}
      ></input>
      <textarea
        maxLength={150}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={t("userArea.smallWidgetsArea.changeSmallWidget.textArea")}
      ></textarea>
      <Button
        clickHandler={changeWidget}
        content={t(
          "userArea.smallWidgetsArea.changeSmallWidget.changeWidgetButton"
        )}
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
