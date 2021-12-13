import { Link } from "react-router-dom";
import styles from "./todayAction.module.css";

function TodayAction({ actionObject }) {
  return (
    <div className={styles.calendarSubsurface}>
      <div className={styles.todayAction}>
        <div className={styles.event}>{actionObject["event"]}</div>
        <div className={styles.emodji}>
          {actionObject["emodji"] ? actionObject["emodji"]["emoji"] : null}
        </div>
        <div className={styles.addButtonsBlock}>
          <Link to="/home">
            <div className={styles.cancelButton}>Close</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TodayAction;
