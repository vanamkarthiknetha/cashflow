"use client"
import {Chart, ArcElement,Tooltip} from 'chart.js'
Chart.register(ArcElement,Tooltip);

import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data = {
        labels: [
          'bank1',
          'bank2',
          'bank3'
        ],
        datasets: [{
          label: 'Banks',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4,
          cutout:'60%'
        }]
      };
  return <Doughnut data={data} />

}

export default DoughnutChart
