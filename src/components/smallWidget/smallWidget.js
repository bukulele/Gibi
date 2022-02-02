import { useContext, useState } from "react";
import HomePageContext from "../../context/HomePageContext";
import ModalWindow from "../modalWindow/modalWindow";
import WarningModal from "../modalWindow/warningModal";
import ChangeSmallWidget from "./changeSmallWidget";
import styles from "./smallWidget.module.css";

function SmallWidget({ header, content, index }) {
  const isItHomePage = useContext(HomePageContext);
  const [showModal, setShowModal] = useState(false);
  const [warningModalVisibility, setWarningModalVisibility] = useState(false);
  const [hasUnsavedData, setHasUnsavedData] = useState(false);

  const closeModal = () => {
    if (showModal && hasUnsavedData) {
      showWarning();
    } else {
      setShowModal(false);
    }
  };

  const showWarning = () => {
    setWarningModalVisibility(true);
  };

  const hideWarning = () => {
    setWarningModalVisibility(false);
  };

  return (
    <>
      <div
        className={styles.smallWidget}
        onClick={isItHomePage ? () => setShowModal(true) : null}
      >
        <h5 className={styles.header}>{header}</h5>
        <div className={styles.content}>{content}</div>
      </div>
      <ModalWindow visibility={showModal} changeModalVisibility={closeModal}>
        <ChangeSmallWidget
          setHasUnsavedData={setHasUnsavedData}
          changeModalVisibility={closeModal}
          headerToChange={header}
          contentToChange={content}
          index={index}
        />
      </ModalWindow>
      <WarningModal
        setModalVisibility={setShowModal}
        setHasUnsavedData={setHasUnsavedData}
        hideWarning={hideWarning}
        warningModalVisibility={warningModalVisibility}
      />
    </>
  );
}

export default SmallWidget;
