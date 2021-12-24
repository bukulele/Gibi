import { useContext, useEffect, useState } from "react";
import styles from "./currentActionsInfographics.module.css";
import UserDataContext from "../../context/UserDataContext";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

function CurrentActionsInfographics() {
  const userData = useContext(UserDataContext);
  const [currentActions, setCurrentActions] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (userData?.currentActions)
      setCurrentActions([...userData.currentActions]);
  }, [userData]);

  useEffect(() => {
    if (currentActions) {
      let dataArray = [];
      for (let element of currentActions) {
        dataArray.push({
          id: element.action,
          data: [
            { x: element.action, y: (element.progress / element.total) * 100 },
          ],
        });
      }
      setChartData([...dataArray]);
    }
  }, [currentActions, userData]);

  return (
    <div className={styles.currentActionsInfographics}>
      <ResponsiveRadialBar
        data={chartData}
        maxValue={100}
        valueFormat=">-.2f"
        endAngle={270}
        padding={0.4}
        cornerRadius={5}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={null}
        legends={[]}
        colors={{ scheme: "set3" }}
      />
    </div>
  );
}

export default CurrentActionsInfographics;
