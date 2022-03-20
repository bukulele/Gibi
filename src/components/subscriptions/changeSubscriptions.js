import { useReducer, useRef, useContext, useState, useEffect } from "react";
import ChangeSubscriptionsReducer from "../../reducer/changeSubscriptioonsReducer";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import StorageContext from "../../context/StorageContext";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import UserImage from "../userImage/userImage";
import styles from "./changeSubscriptions.module.css";

function ChangeSubscriptions({ friendsList }) {
  const [list, setList] = useState([]);
  const [subscriptions, setSubscriptions] = useReducer(
    ChangeSubscriptionsReducer,
    {}
  );

  const subsRef = useRef();
  const storage = useContext(StorageContext);

  const deleteSub = (event) => {
    console.log(event.target.id);
    // setSubscriptions();
  };

  const showDeleteButton = (event) => {
    subsRef.current = event.target;
    subsRef.current.lastChild.style = "display: flex";
  };

  const hideDeleteButton = () => {
    subsRef.current.lastChild.style = "display: none";
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
    </div>
  );
}

export default ChangeSubscriptions;
