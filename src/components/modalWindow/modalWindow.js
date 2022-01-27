import ReactDOM from "react-dom";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./modalWindow.module.css";

function ModalWindow({ visibility, changeModalVisibility, children }) {
  return ReactDOM.createPortal(
    visibility ? (
      <div
        onClick={changeModalVisibility}
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
