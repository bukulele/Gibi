import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/button";
import styles from "./changeEmailForm.module.css";

function ChangeEmailForm({ changeModalVisibility }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const { t } = useTranslation();

  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  const changeCurrentPasswordHandler = (event) => {
    setCurrentPassword(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setNewEmail(event.target.value);
  };

  const changeConfirmedEmailHandler = (event) => {
    setConfirmedEmail(event.target.value);
  };

  const saveNewEmail = () => {
    if (newEmail === confirmedEmail && newEmail.match(emailRegExp)) {
      const credentials = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      reauthenticateWithCredential(user, credentials)
        .then((response) => {
          updateEmail(response.user, newEmail)
            .then(() => {
              alert(t("settings.newEmail.successChange"));
            })
            .then(() => {
              changeModalVisibility();
            })
            .catch((error) => {
              console.log(error);
              alert(error.message);
            });
        })
        .catch((error) => alert(error.message));
    } else {
      alert(t("settings.newEmail.wrongEmail"));
    }
  };

  return (
    <div className={styles.changeEmailForm}>
      <div className={styles.newEmailBlock}>
        <label htmlFor="currentPassword">
          {t("settings.newPassword.currentPassword")}
        </label>
        <input
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={changeCurrentPasswordHandler}
        />
        <label htmlFor="newEmail">{t("settings.newEmail.newEmail")}</label>
        <input
          type="email"
          name="newEmail"
          value={newEmail}
          onChange={changeEmailHandler}
        />
        <label htmlFor="confirmEmail">
          {t("settings.newEmail.confirmEmail")}
        </label>
        <input
          type="email"
          name="confirmEmail"
          value={confirmedEmail}
          onChange={changeConfirmedEmailHandler}
        />
      </div>
      <div className={styles.buttonsBlock}>
        <Button
          content={t("settings.newEmail.cancelButton")}
          clickHandler={changeModalVisibility}
          buttonStyle={styles.cancelButton}
          type="button"
        />
        <Button
          content={t("settings.newEmail.confirmButton")}
          clickHandler={saveNewEmail}
          buttonStyle={styles.confirmButton}
          type="button"
        />
      </div>
    </div>
  );
}

export default ChangeEmailForm;
