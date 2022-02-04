import { useTranslation } from "react-i18next";
import Button from "../button/button";
import styles from "./warningModal.module.css";

function WarningModal({
  setModalVisibility,
  setHasUnsavedData,
  hideWarning,
  warningModalVisibility,
}) {
  const { t } = useTranslation();

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
      <p>{t("warningModal.text")}</p>
      <div className={styles.buttonsBlock}>
        <Button
          content={t("warningModal.comebackButton")}
          clickHandler={comeback}
          buttonStyle={styles.comebackButton}
          type="button"
        />
        <Button
          content={t("warningModal.closeAnywayButton")}
          clickHandler={closeWithoutSaving}
          buttonStyle={styles.closeAnywayButton}
          type="button"
        />
      </div>
    </div>
  );
}

export default WarningModal;
