import { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Button from "../button/button";
import UserImage from "../userImage/userImage";
import styles from "./imageEditorArea.module.css";
import MyDropZone from "./myDropZone";

function ImageEditorArea() {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const handleScaleChange = (event) => {
    setScale(event.target.value);
  };

  const handleRotateChange = (event) => {
    if (event.target.id === "turnRight") {
      setRotate((rotatePrev) => (rotatePrev === 270 ? 0 : rotatePrev + 90));
    } else if (event.target.id === "turnLeft") {
      setRotate((rotatePrev) => (rotatePrev === 90 ? 0 : rotatePrev - 90));
    }
  };

  const closeEditor = () => {
    setImage(null);
    setScale(1);
    setRotate(0);
  };

  return (
    <div className={styles.imageEditorArea}>
      <div className={styles.userImage}>
        <UserImage />
      </div>
      <MyDropZone setImage={setImage} />
      <div
        className={`${styles.editPhoto} ${image ? styles.editPhotoShow : ""}`}
      >
        <AvatarEditor
          image={image}
          width={300}
          height={300}
          border={0}
          borderRadius={150}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          rotate={rotate}
        />
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
        <div className={styles.editButtons}>
          <Button
            id="turnLeft"
            content="<"
            clickHandler={handleRotateChange}
            buttonStyle={styles.rotateButton}
            type="button"
          />
          <Button
            id="turnRight"
            content=">"
            clickHandler={handleRotateChange}
            buttonStyle={styles.rotateButton}
            type="button"
          />
        </div>
        <div className={styles.finishButtons}>
          <Button
            content="Close"
            clickHandler={closeEditor}
            buttonStyle={styles.closeButton}
            type="button"
          />
          <Button
            content="Save"
            buttonStyle={styles.saveButton}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageEditorArea;
