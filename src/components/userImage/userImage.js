import logo from "../../misc/gibi_face.png";
import styles from "./userImage.module.css";

function UserImage({ userImage }) {
  return (
    <div className={styles.userImage}>
      <img className={styles.logo} src={userImage ? userImage : logo} />
    </div>
  );
}

export default UserImage;
