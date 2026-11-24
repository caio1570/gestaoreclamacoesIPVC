import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

import { Pie } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
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
        data: [12, 8, 5, 14, 7]
      }
    ]
  }

  return (
    <div>
      <h3>Ocorrências por estado</h3>

      <Pie data={data} />
    </div>
  )
}

export default GraficoEstados