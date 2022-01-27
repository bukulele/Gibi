import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { BasicTooltip } from "@nivo/tooltip";
import ChangeCurrentAction from "../changeCurrentAction/changeCurrentAction";
import ModalWindow from "../modalWindow/modalWindow";
import Button from "../button/button";
import styles from "./singleAction.module.css";
import HomePageContext from "../../context/HomePageContext";

function SingleAction({ action, total, progress, index, units }) {
  const isItHomePage = useContext(HomePageContext);
  const [modalVisibility, setModalVisibility] = useState(false);

  const changeModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const chartData = [
    {
      data: [
        {
          x: action,
          y: progress,
          units: units,
        },
      ],
    },
  ];

  return (
    <li className={isItHomePage ? styles.actionHome : styles.actionGuest}>
      <div className={styles.chart}>
        <ResponsiveRadialBar
          data={chartData}
          maxValue={total}
          endAngle={360}
          innerRadius={0.2}
          padding={0.4}
          cornerRadius={0}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          enableRadialGrid={false}
          enableCircularGrid={false}
          radialAxisStart={null}
          circularAxisOuter={null}
          legends={[]}
          tooltip={({ bar }) => {
            return (
              <BasicTooltip
                value={`${bar.value} ${bar.data.units}`}
                id={<span>{bar.category}</span>}
                color={bar.color}
              />
            );
          }}
          colors={"rgb(0, 191, 255"}
        />
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
