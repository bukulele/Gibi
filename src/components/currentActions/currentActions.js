import { useContext, useEffect, useState } from "react";
import Button from "../button/button";
import styles from "./currentActions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import AddNewCurrentAction from "../addNewAction/addNewCurrentAction";
import UserDataContext from "../../context/UserDataContext";
import ModalWindow from "../modalWindow/modalWindow";

function CurrentActions() {
  const [currentDataList, setCurrentDataList] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  const userData = useContext(UserDataContext);

  const changeModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  useEffect(() => {
    if (userData.currentActions) {
      let newCurrentDataArray = userData.currentActions.map((object, index) => {
        let key = object.progress * object.total + object.action;
        if (index > 0) {
          return (
            <div key={key} className={styles.action}>
              <div>{object.category}</div>
              <div>{object.action}</div>
              <div>{object.progress}</div>
              <div>out of</div>
              <div>{object.total}</div>
              <div>{object.units}</div>
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
          return null;
        }
      });
      setCurrentDataList([...newCurrentDataArray]);
    }
  }, [userData]);

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
        <Button
          clickHandler={changeModalVisibility}
          buttonStyle="addNewCurrentAction"
          type="button"
          content={<FontAwesomeIcon icon={faPlusCircle} pointerEvents="none" />}
        />
        <ModalWindow
          visibility={modalVisibility}
          changeModalVisibility={changeModalVisibility}
        >
          <AddNewCurrentAction />
        </ModalWindow>
      </div>
      {currentDataList}
    </div>
  );
}

export default CurrentActions;
