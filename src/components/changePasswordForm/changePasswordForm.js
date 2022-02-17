import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/button";
import styles from "./changePasswordForm.module.css";

function ChangePasswordForm({ changeModalVisibility }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const { t } = useTranslation();

  const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  const auth = getAuth();
  const user = auth.currentUser;

  const changeCurrentPasswordHandler = (event) => {
    setCurrentPassword(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const changeConfirmedPasswordHandler = (event) => {
    setConfirmedPassword(event.target.value);
  };

  const saveNewPassword = () => {
    if (
      newPassword === confirmedPassword &&
      newPassword.match(passwordRegExp)
    ) {
      const credentials = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      reauthenticateWithCredential(user, credentials)
        .then((response) => {
          updatePassword(response.user, newPassword)
            .then(() => {
              alert(t("settings.newPassword.successChange"));
            })
            .then(() => {
              changeModalVisibility();
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => alert(error.message));
    } else {
      alert(t("settings.newPassword.wrongPassword"));
    }
  };

  return (
    <div className={styles.changePasswodForm}>
      <div className={styles.newPasswordBlock}>
        <label htmlFor="currentPassword">
          {t("settings.newPassword.currentPassword")}
        </label>
        <input
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={changeCurrentPasswordHandler}
        />
        <label htmlFor="newPassword">
          {t("settings.newPassword.newPassword")}
        </label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={changePasswordHandler}
        />
        <label htmlFor="confirmPassword">
          {t("settings.newPassword.confirmPassword")}
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmedPassword}
          onChange={changeConfirmedPasswordHandler}
        />
      </div>
      <div className={styles.buttonsBlock}>
        <Button
          content={t("settings.newPassword.cancelButton")}
          clickHandler={changeModalVisibility}
          buttonStyle={styles.cancelButton}
          type="button"
        />
        <Button
          content={t("settings.newPassword.confirmButton")}
          clickHandler={saveNewPassword}
          buttonStyle={styles.confirmButton}
          type="button"
        />
      </div>
    </div>
  );
}

export default ChangePasswordForm;
