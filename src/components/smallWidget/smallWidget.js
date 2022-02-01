import { useContext, useState } from "react";
import HomePageContext from "../../context/HomePageContext";
import ModalWindow from "../modalWindow/modalWindow";
import ChangeSmallWidget from "./changeSmallWidget";
import styles from "./smallWidget.module.css";

function SmallWidget({ header, content, index }) {
  const isItHomePage = useContext(HomePageContext);
  const [showModal, setShowModal] = useState(false);

  const changeModalVisibility = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div
        className={styles.smallWidget}
        onClick={isItHomePage ? changeModalVisibility : null}
      >
        <h4>{header}</h4>
        <div>{content}</div>
      </div>
      <ModalWindow
        visibility={showModal}
        changeModalVisibility={changeModalVisibility}
      >
        <ChangeSmallWidget
          changeModalVisibility={changeModalVisibility}
          headerToChange={header}
          contentToChange={content}
          index={index}
        />
      </ModalWindow>
    </>
  );
}

export default SmallWidget;
