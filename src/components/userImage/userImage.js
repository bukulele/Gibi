import { useContext } from "react";
import UserContext from "../../context/UserContext";
import logo from "../../misc/gibi_face.png";
import styles from "./userImage.module.css";

function UserImage() {
  const user = useContext(UserContext);

  return (
    <div className={styles.userImage}>
      <img className={styles.logo} src={user.photoUrl ? user.photoUrl : logo} />
    </div>
  );
}

export default UserImage;
