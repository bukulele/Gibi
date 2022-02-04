import { useTranslation } from "react-i18next";
import styles from "./customTooltip.module.css";

function CustomTooltip({ active, payload }) {
  const { t } = useTranslation();

  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.label}>{payload[0].payload.name}</p>
        <p>{`${payload[0].payload.progress} ${payload[0].payload.units} ${t(
          "userArea.currentActions.changeAction.outOf"
        )} ${payload[0].payload.total}`}</p>
      </div>
    );
  }

  return null;
}

export default CustomTooltip;
