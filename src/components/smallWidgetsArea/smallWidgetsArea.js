import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import HomePageContext from "../../context/HomePageContext";
import UserDataContext from "../../context/UserDataContext";
import Button from "../button/button";
import SmallWidget from "../smallWidget/smallWidget";
import ModalWindow from "../modalWindow/modalWindow";
import AddSmallWidget from "../smallWidget/addSmallWidget";
import styles from "./smallWidgetsArea.module.css";
import WarningModal from "../modalWindow/warningModal";

function SmallWidgetsArea() {
  const isItHomePage = useContext(HomePageContext);
  const userData = useContext(UserDataContext);
  const [smallWidgetsArray, setSmallWidgetsArray] = useState([]);
  const [showNewWidgetModal, setshowNewWidgetModal] = useState(false);
  const [warningModalVisibility, setWarningModalVisibility] = useState(false);
  const [hasUnsavedData, setHasUnsavedData] = useState(false);

  const closeModal = () => {
    if (showNewWidgetModal && hasUnsavedData) {
      showWarning();
    } else {
      setshowNewWidgetModal(false);
    }
  };

  const showWarning = () => {
    setWarningModalVisibility(true);
  };

  const hideWarning = () => {
    setWarningModalVisibility(false);
  };

  useEffect(() => {
    if (userData) {
      setSmallWidgetsArray(() => {
        const newWidgetsArray = userData.smallWidgets.map((element, index) => (
          <SmallWidget
            key={element + index}
            header={element.header}
            content={element.content}
            index={index}
          />
        ));
        return newWidgetsArray;
      });
    }
  }, [userData]);

  return (
    <>
      <div className={styles.smallWidgetsArea}>
        {isItHomePage ? (
          <Button
            content={
              <FontAwesomeIcon icon={faPlusCircle} pointerEvents="none" />
            }
            clickHandler={() => setshowNewWidgetModal(true)}
            buttonStyle={styles.addWidgetButton}
            type="button"
          />
        ) : null}
        {smallWidgetsArray}
      </div>
      <ModalWindow
        visibility={showNewWidgetModal}
        changeModalVisibility={closeModal}
      >
        <AddSmallWidget
          hasUnsavedData={hasUnsavedData}
          setHasUnsavedData={setHasUnsavedData}
          changeModalVisibility={closeModal}
        />
      </ModalWindow>
      <WarningModal
        setModalVisibility={setshowNewWidgetModal}
        setHasUnsavedData={setHasUnsavedData}
        hideWarning={hideWarning}
        warningModalVisibility={warningModalVisibility}
      />
    </>
  );
}

export default SmallWidgetsArea;
