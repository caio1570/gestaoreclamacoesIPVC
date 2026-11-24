import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
)

const GraficoEstados = () => {

  const data = {
    labels: [
      'Submetida',
      'Em análise',
      'Em tratamento',
      'Resolvida',
      'Encerrada'
    ],

    datasets: [
      {
        label: 'Ocorrências',
        data: [67,69, 44, 29, 12]
      }
    ]
  }

  return (
    <div>
      <h3>Ocorrências por estado</h3>

      <Bar data={data} />
    </div>
  )
}

export default GraficoEstados