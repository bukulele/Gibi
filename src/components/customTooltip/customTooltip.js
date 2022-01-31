import styles from "./customTooltip.module.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.label}>{payload[0].payload.name}</p>
        <p>{`${payload[0].payload.progress} ${payload[0].payload.units} out of ${payload[0].payload.total}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
