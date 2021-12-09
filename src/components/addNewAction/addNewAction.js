import styles from "./addNewAction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { Link, Navigate } from "react-router-dom";

function AddNewAction({ uid }) {
  const [category, setCategory] = useState("");
  const [action, setAction] = useState("");
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [units, setUnits] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDataSent, setIsDataSent] = useState(false);
  const [currentDataFile, setCurrentDataFile] = useState({});

  const addNewAction = (e) => {
    e.preventDefault();
    let data = { ...currentDataFile };
    data.currentActions.push({
      category: category,
      action: action,
      progress: progress,
      total: total,
      units: units,
      startDate: startDate,
      endDate: endDate,
    });
    let collectionRef = doc(firestore, "users", uid);
    const docRef = setDoc(collectionRef, data, { merge: true }).then(() =>
      setIsDataSent(true)
    );
  };

  useEffect(() => {
    const docRef = doc(firestore, "users", uid);
    const docSnap = getDoc(docRef)
      .then((response) => response.data())
      .then((data) => setCurrentDataFile({ ...data }))
      .catch((error) => console.log(`error: ${error}`));
  }, []);

  if (isDataSent) return <Navigate to="/" />;

  return (
    <div className={styles.subsurface}>
      <Link to="/home">
        <div className={styles.exitButton}>
          <FontAwesomeIcon icon={faTimes} pointerEvents="none" />
        </div>
      </Link>
      <form onSubmit={addNewAction} className={styles.addNewAction}>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        ></input>
        <label htmlFor="action">Action:</label>
        <input
          type="text"
          name="action"
          value={action}
          onChange={(event) => setAction(event.target.value)}
        ></input>
        <label htmlFor="progress">Progress:</label>
        <input
          type="number"
          name="progress"
          value={progress}
          onChange={(event) => setProgress(event.target.value)}
        ></input>
        <label htmlFor="total">Total:</label>
        <input
          type="number"
          name="total"
          value={total}
          onChange={(event) => setTotal(event.target.value)}
        ></input>
        <label htmlFor="units">Units:</label>
        <input
          type="text"
          name="units"
          value={units}
          onChange={(event) => setUnits(event.target.value)}
        ></input>
        <label htmlFor="startdate">Start Date:</label>
        <input
          type="text"
          name="startdate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        ></input>
        <label htmlFor="enddate">End Date:</label>
        <input
          type="text"
          name="enddate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        ></input>
        <button type="submit">Add data</button>
      </form>
    </div>
  );
}

export default AddNewAction;
