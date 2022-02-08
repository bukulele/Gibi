import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import UserContext from "../../context/UserContext";
import styles from "./userSettings.module.css";
import FirestoreContext from "../../context/FirebaseContext";
import ImageUpload from "../imageEditor/imageUpload";
import ImageEditorArea from "../imageEditor/imageEditorArea";

function UserSettings() {
  const user = useContext(UserContext);
  const firestore = useContext(FirestoreContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.displayName) {
      onSnapshot(doc(firestore, "users", user.displayName), (doc) => {
        setUserData(doc.data());
      });
    }
  }, [user]);

  return (
    <div className={styles.userSettingsBackground}>
      <div className={styles.userSettingsWindow}>
        {user ? (
          <>
            <h2 className={styles.header}>SETTINGS</h2>
            <div className={styles.userPhoto}>
              <ImageEditorArea />
            </div>
            <div className={styles.userName}>{user.displayName}</div>
            <div className={styles.userEmail}>{user.email}</div>
            <div className={styles.userSubscriptions}></div>
            <div className={styles.userLanguage}></div>
            <div className={styles.userCursor}></div>
            <div className={styles.userPassword}></div>
            <div className={styles.buttons}></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserSettings;
