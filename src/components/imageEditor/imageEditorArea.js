import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/UserContext";
import UserDataContext from "../../context/UserDataContext";
import ModalWindow from "../modalWindow/modalWindow";
import UserImage from "../userImage/userImage";
import ImageEditor from "./imageEditor";
import styles from "./imageEditorArea.module.css";

function ImageEditorArea({ userData }) {
  const [userImageCoverIsShown, setUserImageCoverIsShown] = useState(false);
  const [imageEditorIsShown, setImageEditorIsShown] = useState(false);
  const [userPhotoURL, setUserPhotoURL] = useState(null);

  const { t } = useTranslation();

  const showImageEditor = () => {
    setImageEditorIsShown(!imageEditorIsShown);
  };

  useEffect(() => {
    if (userData) {
      setUserPhotoURL(userData.photoURL);
    }
  }, [userData]);

  return (
    <div className={styles.imageEditorArea}>
      <div
        className={styles.userImage}
        onMouseEnter={() => setUserImageCoverIsShown(true)}
      >
        <div
          onClick={showImageEditor}
          onMouseLeave={() => setUserImageCoverIsShown(false)}
          className={`${styles.userImageCover} ${
            userImageCoverIsShown ? styles.userImageCoverShow : ""
          }`}
        >
          <p>{t("settings.imageEditorArea.image")}</p>
        </div>
        <UserImage userImage={userPhotoURL} />
      </div>
      <ModalWindow
        visibility={imageEditorIsShown}
        changeModalVisibility={showImageEditor}
      >
        <ImageEditor changeModalVisibility={showImageEditor} />
      </ModalWindow>
    </div>
  );
}

export default ImageEditorArea;
