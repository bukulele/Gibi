import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import ChangeCurrentAction from "../changeCurrentAction/changeCurrentAction";
import ModalWindow from "../modalWindow/modalWindow";
import Button from "../button/button";
import styles from "./singleAction.module.css";

function SingleAction({ action, total, progress, index }) {
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
        },
      ],
    },
  ];

  return (
    <li className={styles.action}>
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
          colors={"rgb(0, 191, 255"}
        />
      </div>
      <div>{action}</div>
      <Button
        clickHandler={changeModalVisibility}
        content={<FontAwesomeIcon icon={faPencilAlt} pointerEvents="none" />}
        buttonStyle={styles.correctAction}
        type="button"
      />
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
        />
      </ModalWindow>
    </li>
  );
}

export default SingleAction;
