import { setDoc, doc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import FirestoreContext from "../../context/FirebaseContext";
import UserIdContext from "../../context/UserIdContext";
import UserDataContext from "../../context/UserDataContext";
import Button from "../button/button";
import styles from "./changeCurrentAction.module.css";

function ChangeCurrentAction({ id, changeModalVisibility }) {
  const userData = useContext(UserDataContext);
  const [currentActions, setCurrentActions] = useState([]);
  const firestore = useContext(FirestoreContext);
  const uid = useContext(UserIdContext);
  const [sendData, setSendData] = useState(false);
  const [action, setAction] = useState("");
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [showAddActionButton, setShowAddActionButton] = useState(true);

  const changeAction = () => {
    setCurrentActions((currentActionsPrev) => {
      const currentActionsNew = [...currentActionsPrev];
      currentActionsNew[id] = {
        action: action,
        progress: progress,
        total: total,
        dateModified: new Date(),
      };
      setSendData(true);
      return [...currentActionsNew];
    });
  };

  useEffect(() => {
    if (sendData) {
      const data = {
        currentActions: currentActions,
      };
      const collectionRef = doc(firestore, "users", uid);
      setDoc(collectionRef, data, { merge: true });
      changeModalVisibility();
      setSendData(false);
    }
  }, [currentActions, sendData]);

  useEffect(() => {
    if (currentActions[id]) {
      if (
        action !== currentActions[id].action ||
        (progress !== currentActions[id].progress &&
          total > 0 &&
          total >= progress) ||
        (total !== currentActions[id].total && total > 0 && total >= progress)
      ) {
        setShowAddActionButton(true);
      } else {
        setShowAddActionButton(false);
      }
    }
  }, [action, total, progress, currentActions, id]);

  useEffect(() => {
    if (userData?.currentActions) {
      setCurrentActions([...userData.currentActions]);
      setAction(userData.currentActions[id].action);
      setProgress(userData.currentActions[id].progress);
      setTotal(userData.currentActions[id].total);
    }
  }, [userData]);

  return (
    <div className={styles.changeAction}>
      <div className={styles.action}>
        <h4>Write here your long-term goal:</h4>
        <input
          type="text"
          name="action"
          value={action}
          onChange={(event) => setAction(event.target.value)}
        ></input>
      </div>
      <div className={styles.progressBlock}>
        <h4>And its progress:</h4>
        <input
          type="number"
          name="progress"
          min="0"
          className={styles.progress}
          value={progress}
          onChange={(event) => setProgress(event.target.value)}
        ></input>
        <div className={styles.outOf}>out of</div>
        <input
          type="number"
          name="total"
          min="0"
          className={styles.total}
          value={total}
          onChange={(event) => setTotal(event.target.value)}
        ></input>
      </div>
      <Button
        clickHandler={changeAction}
        content={"Confirm changes"}
        buttonStyle={`${styles.changeActionButton} ${
          showAddActionButton
            ? styles.changeActionButtonShow
            : styles.changeActionButtonHide
        }`}
        type="button"
      />
    </div>
  );
}

export default ChangeCurrentAction;
