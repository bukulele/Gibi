import { useContext, useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "../button/button";
import MyDropZone from "./myDropZone";
import styles from "./imageEditor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import StorageContext from "../../context/StorageContext";
import UserContext from "../../context/UserContext";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import FirestoreContext from "../../context/FirestoreContext";

function ImageEditor({ changeModalVisibility }) {
  const firestore = useContext(FirestoreContext);
  const storage = useContext(StorageContext);
  const user = useContext(UserContext);

  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [path, setPath] = useState(null);

  const { t } = useTranslation();

  const editorRef = useRef();

  const handleScaleChange = (event) => {
    setScale(+event.target.value);
  };

  const handleRotateChange = (event) => {
    if (event.target.id === "turnRight") {
      setRotate((rotatePrev) => (rotatePrev === 270 ? 0 : rotatePrev + 90));
    } else if (event.target.id === "turnLeft") {
      setRotate((rotatePrev) => (rotatePrev === 90 ? 0 : rotatePrev - 90));
    }
  };

  const saveImage = () => {
    const scaledImage = editorRef.current.getImageScaledToCanvas();
    scaledImage.toBlob((blob) => {
      const storageRef = ref(storage, path);
      uploadBytes(storageRef, blob)
        .then(() =>
          getDownloadURL(ref(storage, path)).then((url) => {
            const auth = getAuth();
            const collectionRef = doc(firestore, "users", user.displayName);
            updateProfile(auth.currentUser, {
              photoURL: url,
            });
            setDoc(collectionRef, { photoURL: url }, { merge: true });
          })
        )
        .then(() => {
          closeEditor();
        });
    });
  };

  const closeEditor = () => {
    setImage(null);
    setScale(1);
    setRotate(0);
    changeModalVisibility();
  };

  useEffect(() => {
    if (user) {
      setPath(`${user.displayName}/logo`);
    }
  }, [user]);

  return (
    <>
      <MyDropZone setImage={setImage} />
      <div
        className={`${styles.editPhoto} ${image ? styles.editPhotoShow : ""}`}
      >
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={300}
          height={300}
          border={0}
          borderRadius={150}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          rotate={rotate}
        />
        <div className={styles.editButtons}>
          <Button
            id="turnLeft"
            content={
              <FontAwesomeIcon icon={faRotateLeft} pointerEvents="none" />
            }
            clickHandler={handleRotateChange}
            buttonStyle={styles.rotateButton}
            type="button"
          />
          <Button
            id="turnRight"
            content={
              <FontAwesomeIcon icon={faRotateRight} pointerEvents="none" />
            }
            clickHandler={handleRotateChange}
            buttonStyle={styles.rotateButton}
            type="button"
          />
        </div>
        <div className={styles.scaleBlock}>
          <label htmlFor="scaleInput">
            {t("settings.imageEditorArea.scale")}
          </label>
          <input
            type="range"
            onChange={handleScaleChange}
            className={styles.scaleInput}
            min="1"
            max="10"
            value={scale}
            step="0.1"
            name="scaleInput"
          />
        </div>
        <div className={styles.finishButtons}>
          <Button
            content={t("settings.imageEditorArea.closeButton")}
            clickHandler={closeEditor}
            buttonStyle={styles.closeButton}
            type="button"
          />
          <Button
            clickHandler={saveImage}
            content={t("settings.imageEditorArea.saveButton")}
            buttonStyle={styles.saveButton}
            type="button"
          />
        </div>
      </div>
    </>
  );
}

export default ImageEditor;
