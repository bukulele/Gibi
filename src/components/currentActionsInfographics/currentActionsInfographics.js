import { useContext, useEffect, useState } from "react";
import styles from "./currentActionsInfographics.module.css";
import UserDataContext from "../../context/UserDataContext";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { BasicTooltip } from "@nivo/tooltip";
import HomePageContext from "../../context/HomePageContext";

function CurrentActionsInfographics() {
  const userData = useContext(UserDataContext);
  const isItHomePage = useContext(HomePageContext);
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
            {
              x: element.action,
              y: Math.round((element.progress / element.total) * 100),
            },
          ],
        });
      }
      setChartData([...dataArray]);
    }
  }, [currentActions, userData]);

  return (
    <div className={styles.currentActionsInfographics}>
      <div className={styles.currentActionsInfographicsHeader}>
        <h4>
          What {isItHomePage ? "are you" : `is ${userData.userName}`} doing (but
          pretty)
        </h4>
      </div>
      <div className={styles.graph}>
        <ResponsiveRadialBar
          data={chartData}
          maxValue={100}
          valueFormat=">-.0"
          endAngle={270}
          padding={0.4}
          cornerRadius={5}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          enableRadialGrid={false}
          enableCircularGrid={false}
          radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
          circularAxisOuter={null}
          legends={[]}
          tooltip={({ bar }) => {
            return (
              <BasicTooltip
                value={`${bar.value}%`}
                id={<span>{bar.groupId}</span>}
                color={bar.color}
              />
            );
          }}
          colors={{ scheme: "purpleRed_green" }}
        />
      </div>
    </div>
  );
}

export default CurrentActionsInfographics;
