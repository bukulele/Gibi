import ReactDOM from "react-dom";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./modalWindow.module.css";
import { useRef } from "react";

function ModalWindow({ visibility, changeModalVisibility, children }) {
  const modalRef = useRef();
  const clickHandler = (event) => {
    if (event.target === modalRef.current) changeModalVisibility();
  };
  return ReactDOM.createPortal(
    visibility ? (
      <div
        ref={modalRef}
        onClick={clickHandler}
        className={`${styles.modalSubsurface} ${
          visibility ? styles.modalVisible : styles.modalInvisible
        }`}
      >
        <Button
          clickHandler={changeModalVisibility}
          buttonStyle={styles.exitButton}
          type="button"
          content={<FontAwesomeIcon icon={faTimes} pointerEvents="none" />}
        />
        <div className={styles.modalContentWindow}>{children}</div>
      </div>
    ) : null,
    document.getElementById("modal")
  );
}

export default ModalWindow;
