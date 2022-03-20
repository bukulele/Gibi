import { useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./subscriptions.module.css";
import { useTranslation } from "react-i18next";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import StorageContext from "../../context/StorageContext";
import UserImage from "../userImage/userImage";

function Subscriptions({
  showSubscriptionsList,
  friendsList,
  changeSubscriptionsVisibility,
}) {
  const [friendsObject, setFriendsObject] = useState({});
  const [subscriptionsList, setSubscriptionsList] = useState([]);

  const storage = useContext(StorageContext);
  const subscriptionsRef = useRef();

  const { t } = useTranslation();

  const clickHandler = (event) => {
    if (event.target === subscriptionsRef.current)
      changeSubscriptionsVisibility();
  };

  useEffect(() => {
    if (friendsList.length > 0) {
      setFriendsObject((prevObject) => {
        let newObject = { ...prevObject };
        for (let friend of friendsList) {
          newObject[friend] = "";
        }
        return newObject;
      });
    }
  }, [friendsList]);

  useEffect(() => {
    if (Object.keys(friendsObject).length > 0) {
      for (let friend of friendsList) {
        const path = `${friend}/logo`;
        listAll(ref(storage, `${friend}/`)).then((result) => {
          if (result.items.length > 0) {
            getDownloadURL(ref(storage, path)).then((url) => {
              setFriendsObject((prevObject) => {
                let newObject = { ...prevObject };
                newObject[friend] = url;
                return newObject;
              });
            });
          }
        });
      }
    }
  }, [friendsList]);

  useEffect(() => {
    setSubscriptionsList(
      Object.entries(friendsObject).map((item) => {
        return (
          <li key={item[0]} className={styles.sub}>
            <Link to={`/${item[0]}`}>
              <UserImage userImage={item[1]} />
              <p>{item[0]}</p>
            </Link>
          </li>
        );
      })
    );
  }, [friendsObject]);

  return (
    <div
      ref={subscriptionsRef}
      onClick={clickHandler}
      className={`${styles.subscriptionsWrapper} ${
        showSubscriptionsList ? styles.subscriptionsVisible : ""
      }`}
    >
      <div className={styles.subscriptions}>
        <div className={styles.subscriptionsHeader}>
          <h4>{t("userArea.subscriptions.header")}</h4>
        </div>
        <ul className={styles.subscriptionsList}>{subscriptionsList}</ul>
      </div>
    </div>
  );
}

export default Subscriptions;
