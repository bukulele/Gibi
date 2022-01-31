import { useContext, useEffect, useState } from "react";
import styles from "./currentActionsInfographics.module.css";
import UserDataContext from "../../context/UserDataContext";
import HomePageContext from "../../context/HomePageContext";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import CustomTooltip from "../customTooltip/customTooltip";

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
          name: element.action,
          percentage: Math.round((element.progress / element.total) * 100),
          progress: element.progress,
          total: element.total,
          units: element.units,
          fill: `hsl(${Math.floor(Math.random() * (359 - 0))}, 22%, 50%)`,
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
        <ResponsiveContainer>
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={450}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            barSize={20}
            innerRadius={50}
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
    </div>
  );
}

export default CurrentActionsInfographics;
