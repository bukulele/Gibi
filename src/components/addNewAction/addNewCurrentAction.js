import styles from "./addNewAction.module.css";
import { useContext, useEffect, useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import FirestoreContext from "../../context/FirebaseContext";
import UserContext from "../../context/UserContext";
import Button from "../button/button";

function AddNewCurrentAction({ setHasUnsavedData, changeModalVisibility }) {
  const firestore = useContext(FirestoreContext);
  const user = useContext(UserContext);
  const [action, setAction] = useState("");
  const [progress, setProgress] = useState("");
  const [total, setTotal] = useState("");
  const [units, setUnits] = useState("");
  const [showAddActionButton, setShowAddActionButton] = useState(false);

  const addNewAction = () => {
    let data = {
      action: action,
      progress: progress,
      total: total,
      units: units,
      dateCreated: new Date(),
      dateModified: new Date(),
    };
    let collectionRef = doc(firestore, "users", user.displayName);
    updateDoc(collectionRef, "currentActions", arrayUnion(data)).then(() =>
      changeModalVisibility()
    );
  };

  useEffect(() => {
    if (action !== "" && +total > 0 && +total >= +progress) {
      setShowAddActionButton(true);
    } else {
      setShowAddActionButton(false);
    }
  }, [action, total, progress]);

  useEffect(() => {
    if (showAddActionButton) {
      setHasUnsavedData(true);
    } else {
      setHasUnsavedData(false);
    }
  }, [showAddActionButton]);

  return (
    <div className={styles.addNewAction}>
      <div className={styles.action}>
        <h4>Write here your long-term goal:</h4>
        <input
          type="text"
          name="action"
          value={action}
          onChange={(event) => setAction(event.target.value)}
          maxLength={150}
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
        <input
          type="text"
          name="units"
          value={units}
          placeholder="units"
          onChange={(event) => setUnits(event.target.value)}
          className={styles.units}
        ></input>
      </div>
      <Button
        clickHandler={addNewAction}
        content={"Add new action"}
        buttonStyle={`${styles.addActionButton} ${
          showAddActionButton
            ? styles.addActionButtonShow
            : styles.addActionButtonHide
        }`}
        type="button"
      />
    </div>
  );
}

export default AddNewCurrentAction;
