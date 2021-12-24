import { useContext, useEffect, useState } from "react";
import Button from "../button/button";
import styles from "./currentActions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AddNewCurrentAction from "../addNewAction/addNewCurrentAction";
import SingleAction from "../singleAction/singleAction";
import UserDataContext from "../../context/UserDataContext";
import ModalWindow from "../modalWindow/modalWindow";

function CurrentActions() {
  const userData = useContext(UserDataContext);
  const [currentActions, setCurrentActions] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  const changeModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const newCurrentDataArray = currentActions.map((object, index) => {
    let key = object.progress * object.total + object.action;
    return (
      <SingleAction
        key={key}
        index={index}
        action={object.action}
        total={object.total}
        progress={object.progress}
      />
    );
  });

  useEffect(() => {
    if (userData?.currentActions)
      setCurrentActions([...userData.currentActions]);
  }, [userData]);

  return (
    <div className={styles.currentActions}>
      <div className={styles.currentActionsHeader}>
        <div>Progress</div>
        <div>Action</div>
        <Button
          clickHandler={changeModalVisibility}
          buttonStyle={styles.addNewCurrentAction}
          type="button"
          content={<FontAwesomeIcon icon={faPlusCircle} pointerEvents="none" />}
        />
        <ModalWindow
          visibility={modalVisibility}
          changeModalVisibility={changeModalVisibility}
        >
          <AddNewCurrentAction changeModalVisibility={changeModalVisibility} />
        </ModalWindow>
      </div>
      <ul className={styles.currentActionsList}>{newCurrentDataArray}</ul>
    </div>
  );
}

export default CurrentActions;
