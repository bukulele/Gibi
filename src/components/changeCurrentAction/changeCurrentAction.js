import { setDoc, doc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import FirestoreContext from "../../context/FirestoreContext";
import UserContext from "../../context/UserContext";
import UserDataContext from "../../context/UserDataContext";
import Button from "../button/button";
import styles from "./changeCurrentAction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function ChangeCurrentAction({
  id,
  changeModalVisibility,
  actionToChange,
  progressToChange,
  totalToChange,
  unitsToChange,
  setHasUnsavedData,
  hasUnsavedData,
}) {
  const userData = useContext(UserDataContext);
  const [currentActions, setCurrentActions] = useState([]);
  const firestore = useContext(FirestoreContext);
  const user = useContext(UserContext);
  const [sendData, setSendData] = useState(false);
  const [action, setAction] = useState(actionToChange);
  const [progress, setProgress] = useState(progressToChange);
  const [total, setTotal] = useState(totalToChange);
  const [units, setUnits] = useState(unitsToChange);
  const [showChangeActionButton, setShowChangeActionButton] = useState(false);

  const { t } = useTranslation();

  const changeAction = () => {
    setCurrentActions((currentActionsPrev) => {
      const currentActionsNew = [...currentActionsPrev];
      currentActionsNew[id] = {
        action: action,
        progress: progress,
        total: total,
        units: units,
        dateModified: new Date(),
      };
      setHasUnsavedData(false);
      setSendData(true);
      return [...currentActionsNew];
    });
  };

  const deleteAction = () => {
    setCurrentActions((currentActionsPrev) => {
      const currentActionsNew = [...currentActionsPrev];
      currentActionsNew.splice(id, 1);
      return [...currentActionsNew];
    });
    setHasUnsavedData(false);
    setSendData(true);
  };

  useEffect(() => {
    if (sendData && !hasUnsavedData) {
      const data = {
        currentActions: currentActions,
      };
      const collectionRef = doc(firestore, "users", user.displayName);
      setDoc(collectionRef, data, { merge: true });
      changeModalVisibility();
      return () => {
        setSendData(false);
      };
    }
  }, [sendData, hasUnsavedData]);

  useEffect(() => {
    if (
      action !== actionToChange ||
      (+progress !== +progressToChange &&
        +progress >= 0 &&
        +total > 0 &&
        +total >= +progress) ||
      (+total !== +totalToChange &&
        +progress >= 0 &&
        +total > 0 &&
        +total >= +progress) ||
      units !== unitsToChange
    ) {
      setShowChangeActionButton(true);
    } else {
      setShowChangeActionButton(false);
    }
  }, [action, progress, total, units]);

  useEffect(() => {
    if (userData?.currentActions) {
      setCurrentActions([...userData.currentActions]);
    }
  }, [userData, id]);

  useEffect(() => {
    if (showChangeActionButton) {
      setHasUnsavedData(true);
    } else {
      setHasUnsavedData(false);
    }
  }, [showChangeActionButton]);

  return (
    <div className={styles.changeAction}>
      <div className={styles.action}>
        <h4>{t("userArea.currentActions.changeAction.header")}</h4>
        <input
          type="text"
          name="action"
          value={action}
          onChange={(event) => setAction(event.target.value)}
          maxLength={100}
        ></input>
      </div>
      <div className={styles.progressBlock}>
        <h4>{t("userArea.currentActions.changeAction.secondHeader")}</h4>
        <input
          type="number"
          name="progress"
          min="0"
          className={styles.progress}
          value={progress}
          onChange={(event) => setProgress(event.target.value)}
        ></input>
        <div className={styles.outOf}>
          {t("userArea.currentActions.changeAction.outOf")}
        </div>
        <input
          type="number"
          name="total"
          min="0"
          className={styles.total}
          value={total}
          onChange={(event) => setTotal(event.target.value)}
        ></input>
        <input
          type="text"
          name="units"
          value={units}
          placeholder={t("userArea.currentActions.changeAction.units")}
          onChange={(event) => setUnits(event.target.value)}
          className={styles.units}
        ></input>
      </div>
      <Button
        clickHandler={deleteAction}
        content={<FontAwesomeIcon icon={faTrashAlt} pointerEvents="none" />}
        buttonStyle={styles.deleteActionButton}
        type="button"
      />
      <Button
        clickHandler={changeAction}
        content={t("userArea.currentActions.changeAction.confirmChangesButton")}
        buttonStyle={`${styles.changeActionButton} ${
          showChangeActionButton
            ? styles.changeActionButtonShow
            : styles.changeActionButtonHide
        }`}
        type="button"
      />
    </div>
  );
}

export default ChangeCurrentAction;
