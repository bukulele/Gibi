import styles from "./addNewAction.module.css";
import { useContext, useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import FirestoreContext from "../../context/FirebaseContext";
import UserIdContext from "../../context/UserIdContext";

function AddNewCurrentAction() {
  const [category, setCategory] = useState("");
  const [action, setAction] = useState("");
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [units, setUnits] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDataSent, setIsDataSent] = useState(false);

  const firestore = useContext(FirestoreContext);
  const uid = useContext(UserIdContext);

  const addNewAction = (event) => {
    event.preventDefault();
    let data = {
      category: category,
      action: action,
      progress: progress,
      total: total,
      units: units,
      startDate: startDate,
      endDate: endDate,
    };
    let collectionRef = doc(firestore, "users", uid);
    const docRef = updateDoc(
      collectionRef,
      "currentActions",
      arrayUnion(data)
    ).then(() => setIsDataSent(true));
  };

  return (
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
  );
}

export default AddNewCurrentAction;
