import Button from "../button/button";
import styles from "./warningModal.module.css";

function WarningModal({
  setModalVisibility,
  setHasUnsavedData,
  hideWarning,
  warningModalVisibility,
}) {
  const comeback = () => {
    hideWarning();
  };

  const closeWithoutSaving = () => {
    setHasUnsavedData(false);
    setModalVisibility(false);
    hideWarning();
  };

  return (
    <div
      className={`${styles.warningModal} ${
        warningModalVisibility
          ? styles.showWarningModal
          : styles.hideWarningModal
      }`}
    >
      <p>Be careful! You have unsaved data.</p>
      <div className={styles.buttonsBlock}>
        <Button
          content="Comeback"
          clickHandler={comeback}
          buttonStyle={styles.comebackButton}
          type="button"
        />
        <Button
          content="Close anyway"
          clickHandler={closeWithoutSaving}
          buttonStyle={styles.closeAnywayButton}
          type="button"
        />
      </div>
    </div>
  );
}

export default WarningModal;
