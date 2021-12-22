import React, { useEffect } from "react";
import { ChartData } from "../interface/chartData";
import { highChartJs } from "../scripts/main";
import styles from "../styles/Chart.module.scss";

type Props = {
  dataChart: ChartData | {};
  fromTo: string;
};

const Chart = (props: Props) => {
  const { dataChart, fromTo } = props;

  useEffect(() => {
    if (Object.keys(dataChart).length) {
      highChartJs(dataChart, fromTo);
    }
  }, [dataChart, fromTo]);

  return (
    <div className={styles["highlight-chart-wrapper"]}>
      <div id="highlight-chart" className={styles["highlight-chart"]}></div>
    </div>
  );
};

export default Chart;
