import { useReducer, useRef, useContext, useState, useEffect } from "react";
import ChangeSubscriptionsReducer from "../../reducer/changeSubscriptionsReducer";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import StorageContext from "../../context/StorageContext";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import UserImage from "../userImage/userImage";
import styles from "./changeSubscriptions.module.css";
import FirestoreContext from "../../context/FirestoreContext";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/UserContext";

function ChangeSubscriptions({ friendsList, changeModalVisibility }) {
  const [list, setList] = useState([]);
  const [changesToSave, setChangesToSave] = useState(false);
  const [subscriptions, setSubscriptions] = useReducer(
    ChangeSubscriptionsReducer,
    {}
  );

  const subsRef = useRef();
  const storage = useContext(StorageContext);
  const firestore = useContext(FirestoreContext);
  const user = useContext(UserContext);

  const { t } = useTranslation();

  const deleteSub = (event) => {
    setSubscriptions({
      type: "REMOVE",
      sub: event.target.id,
    });
    setChangesToSave(true);
  };

  const showDeleteButton = (event) => {
    subsRef.current = event.target;
    subsRef.current.lastChild.style = "display: flex";
  };

  const hideDeleteButton = () => {
    subsRef.current.lastChild.style = "display: none";
  };

  const confirmChanges = () => {
    let data = {
      friends: Object.keys(subscriptions),
    };
    const collectionRef = doc(firestore, "users", user.displayName);
    setDoc(collectionRef, data, { merge: true }).then(() => {
      setChangesToSave(false);
      changeModalVisibility();
    });
  };

  useEffect(() => {
    if (friendsList.length > 0) {
      for (let friend of friendsList) {
        const path = `${friend}/logo`;
        listAll(ref(storage, `${friend}/`)).then((result) => {
          if (result.items.length > 0) {
            getDownloadURL(ref(storage, path)).then((url) => {
              setSubscriptions({
                type: "ADD",
                sub: friend,
                url: url,
              });
            });
          } else {
            setSubscriptions({
              type: "ADD",
              sub: friend,
              url: "",
            });
          }
        });
      }
    }
  }, [friendsList]);

  useEffect(() => {
    setList(
      Object.entries(subscriptions).map((item) => {
        return (
          <li
            key={item[0]}
            onMouseEnter={showDeleteButton}
            onMouseLeave={hideDeleteButton}
            className={styles.sub}
            ref={subsRef}
          >
            <UserImage userImage={item[1]} />
            <p>{item[0]}</p>
            <Button
              id={item[0]}
              clickHandler={deleteSub}
              content={
                <FontAwesomeIcon icon={faMinusCircle} pointerEvents="none" />
              }
              buttonStyle={styles.deleteEvent}
              type="button"
            />
          </li>
        );
      })
    );
  }, [subscriptions]);

  return (
    <div className={styles.changeSubscriptions}>
      <ul className={styles.changeSubscriptionsList}>{list}</ul>
      <div className={styles.changeSubscriptionsButtons}>
        <Button
          clickHandler={changesToSave ? confirmChanges : null}
          content={t("settings.changeSubscriptions.confirmChangesButton")}
          buttonStyle={
            changesToSave ? styles.confirmChangesButton : styles.inactiveButton
          }
          type="button"
        />
        <Button
          clickHandler={changeModalVisibility}
          content={t("settings.changeSubscriptions.cancelChangesButton")}
          buttonStyle={styles.cancelChangesButton}
          type="button"
        />
      </div>
    </div>
  );
}

export default ChangeSubscriptions;
