import { useContext, useEffect, useState } from "react";
import Button from "../button/button";
import styles from "./currentActions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AddNewCurrentAction from "../addNewAction/addNewCurrentAction";
import SingleAction from "../singleAction/singleAction";
import UserDataContext from "../../context/UserDataContext";
import ModalWindow from "../modalWindow/modalWindow";
import WarningModal from "../modalWindow/warningModal";
import HomePageContext from "../../context/HomePageContext";

function CurrentActions() {
  const userData = useContext(UserDataContext);
  const isItHomePage = useContext(HomePageContext);
  const [currentActions, setCurrentActions] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [warningModalVisibility, setWarningModalVisibility] = useState(false);
  const [hasUnsavedData, setHasUnsavedData] = useState(false);

  const closeModal = () => {
    if (modalVisibility && hasUnsavedData) {
      showWarning();
    } else {
      setModalVisibility(false);
    }
  };

  const showWarning = () => {
    setWarningModalVisibility(true);
  };

  const hideWarning = () => {
    setWarningModalVisibility(false);
  };

  const newCurrentDataArray = currentActions.map((object, index) => {
    let key = index + object.progress + object.total + object.action;
    return (
      <SingleAction
        key={key}
        index={index}
        action={object.action}
        total={object.total}
        progress={object.progress}
        units={object.units}
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
        <h4>
          What {isItHomePage ? "are you" : `is ${userData.userName}`} doing?
        </h4>
      </div>
      <div
        className={
          isItHomePage
            ? styles.currentActionsHeaderHome
            : styles.currentActionsHeaderGuest
        }
      >
        <div>Progress</div>
        <div>Action</div>
        {isItHomePage ? (
          <Button
            clickHandler={() => setModalVisibility(true)}
            buttonStyle={styles.addNewCurrentAction}
            type="button"
            content={
              <FontAwesomeIcon icon={faPlusCircle} pointerEvents="none" />
            }
          />
        ) : null}
        <ModalWindow
          visibility={modalVisibility}
          changeModalVisibility={closeModal}
        >
          <AddNewCurrentAction
            setHasUnsavedData={setHasUnsavedData}
            changeModalVisibility={closeModal}
          />
        </ModalWindow>
      </div>
      <ul className={styles.currentActionsList}>{newCurrentDataArray}</ul>
      <WarningModal
        setModalVisibility={setModalVisibility}
        setHasUnsavedData={setHasUnsavedData}
        hideWarning={hideWarning}
        warningModalVisibility={warningModalVisibility}
      />
    </div>
  );
}

export default CurrentActions;
