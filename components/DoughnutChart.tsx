"use client"
import {Chart, ArcElement,Tooltip} from 'chart.js'
Chart.register(ArcElement,Tooltip);

import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const labels = accounts.map((account)=>account?.name)
  const currentBalances = accounts.map((account)=>account?.currentBalance)
  const backgroundColors = accounts.map(()=>getRandomColor())
    const data = {
        labels,
        datasets: [{
          label: 'Banks',
          data:currentBalances,
          backgroundColor:backgroundColors,
          hoverOffset: 4,
          cutout:'60%'
        }]
      };
  return <Doughnut data={data} />

}

export default DoughnutChart
