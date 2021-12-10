import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";
import Button from "../button/button";
import styles from "./currentActions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, Link } from "react-router-dom";
import AddNewAction from "../addNewAction/addNewAction";

function CurrentActions({ uid }) {
  const [currentDataArray, setCurrentDataArray] = useState([]);
  const [currentDataList, setCurrentDataList] = useState([]);

  useEffect(() => {
    const docRef = doc(firestore, "users", uid);
    const docSnap = getDoc(docRef)
      .then((response) => response.data())
      .then((data) => setCurrentDataArray([...data.currentActions]))
      .catch((error) => console.log(`error: ${error}`));
  }, []);

  useEffect(() => {
    let newCurrentDataArray = currentDataArray.map((object, index) => {
      let key = object.progress * object.total + object.action;
      if (index > 0) {
        return (
          <div key={key} className={styles.action}>
            <div>{object.category}</div>
            <div>{object.action}</div>
            <div>{object.progress}</div>
            <div>out of</div>
            <div>{object.total}</div>
            <div>{object.unitMeasure}</div>
            <div>{object.startDate}</div>
            <div>{object.endDate}</div>
            <Button
              id={index}
              content={
                <FontAwesomeIcon icon={faPencilAlt} pointerEvents="none" />
              }
              buttonType="currentActionsButton"
            />
            <div className={styles.newActionForm}></div>
          </div>
        );
      } else {
        return;
      }
    });
    setCurrentDataList([...newCurrentDataArray]);
  }, [currentDataArray]);

  return (
    <div className={styles.currentActions}>
      <div className={styles.currentActionsHeader}>
        <div>Category</div>
        <div>Action</div>
        <div>Progress</div>
        <div></div>
        <div>Total</div>
        <div>Units</div>
        <div>Start Date</div>
        <div>End Date</div>
        <Link to="addnewaction">
          <div className={styles.addNewAction}>
            <FontAwesomeIcon icon={faPlusCircle} pointerEvents="none" />
          </div>
        </Link>
        <Routes>
          <Route path="addnewaction" element={<AddNewAction uid={uid} />} />
        </Routes>
      </div>
      {currentDataList}
    </div>
  );
}

export default CurrentActions;