import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import ChangeCurrentAction from "../changeCurrentAction/changeCurrentAction";
import ModalWindow from "../modalWindow/modalWindow";
import Button from "../button/button";
import styles from "./singleAction.module.css";
import HomePageContext from "../../context/HomePageContext";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import CustomTooltip from "../customTooltip/customTooltip";

function SingleAction({ action, total, progress, index, units }) {
  const isItHomePage = useContext(HomePageContext);
  const [modalVisibility, setModalVisibility] = useState(false);

  const changeModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const chartData = [
    {
      action: action,
      percentage: Math.round((progress / total) * 100),
      progress: progress,
      total: total,
      units: units,
      fill: "rgb(137, 142, 111)",
    },
  ];

  return (
    <li className={isItHomePage ? styles.actionHome : styles.actionGuest}>
      <div className={styles.chart}>
        <ResponsiveContainer>
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-360}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            innerRadius={"55%"}
            outerRadius={"100%"}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background={{ fill: "rgb(220, 220, 220)" }}
              dataKey="percentage"
              data={chartData}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div>{action}</div>
      {isItHomePage ? (
        <Button
          clickHandler={changeModalVisibility}
          content={<FontAwesomeIcon icon={faPencilAlt} pointerEvents="none" />}
          buttonStyle={styles.correctAction}
          type="button"
        />
      ) : null}
      <ModalWindow
        visibility={modalVisibility}
        changeModalVisibility={changeModalVisibility}
      >
        <ChangeCurrentAction
          id={index}
          changeModalVisibility={changeModalVisibility}
          actionToChange={action}
          totalToChange={total}
          progressToChange={progress}
          unitsToChange={units}
        />
      </ModalWindow>
    </li>
  );
}

export default SingleAction;
