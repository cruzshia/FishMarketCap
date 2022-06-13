import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    y: { display: false },
    x: { display: false }
  },
  plugins: {
    legend: { display: false },
    labels: { display: false },
    tooltip: { enabled: false }
  }
}

interface Props {
  data: number[]
  labels: string[]
  volume: number
  loading?: boolean
}

export default function Volume({ volume, loading, labels, data }: Props) {
  const { t } = useTranslation()

  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: '#82d116'
      }
    ]
  }

  return (
    <>
      <Typography variant='body2' sx={{ fontWeight: 500, mb: '6px' }}>
        {t('btcVolume24h')}:{' '}
        <Typography variant='body1' component='span' data-cy='exchange-volume'>
          {volume} BTC
        </Typography>
      </Typography>
      {loading && <CircularProgress />}
      {data.length && (
        <Box maxWidth='300px' height='200px'>
          <Line options={options} data={chartData} />
        </Box>
      )}
    </>
  )
}
