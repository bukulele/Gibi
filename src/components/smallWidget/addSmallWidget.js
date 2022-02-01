import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useContext } from "react";
import { useEffect, useState } from "react";
import FirestoreContext from "../../context/FirebaseContext";
import UserContext from "../../context/UserContext";
import Button from "../button/button";
import styles from "./addSmallWidget.module.css";

function AddSmallWidget({ changeModalVisibility }) {
  const user = useContext(UserContext);
  const firestore = useContext(FirestoreContext);
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [showAddWidgetButton, setShowAddWidgetButton] = useState(false);

  const addNewWidget = () => {
    let data = {
      header: header,
      content: content,
      dateOfCreation: new Date(),
      dateModified: new Date(),
    };
    let collectionRef = doc(firestore, "users", user.displayName);
    updateDoc(collectionRef, "smallWidgets", arrayUnion(data))
      .then(() => {
        changeModalVisibility();
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    if (header.length > 0 && content.length > 0) {
      setShowAddWidgetButton(true);
    } else {
      setShowAddWidgetButton(false);
    }
  }, [header, content]);

  return (
    <div className={styles.addSmallWidget}>
      <input
        type="text"
        name="header"
        value={header}
        onChange={(event) => setHeader(event.target.value)}
        placeholder="Just one interesting thing"
      ></input>
      <textarea
        maxLength={200}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Specify it here!"
      ></textarea>
      <Button
        clickHandler={addNewWidget}
        content={"Add new widget"}
        buttonStyle={`${styles.addWidgetButton} ${
          showAddWidgetButton
            ? styles.addWidgetButtonShow
            : styles.addWidgetButtonHide
        }`}
        type="button"
      />
    </div>
  );
}

export default AddSmallWidget;