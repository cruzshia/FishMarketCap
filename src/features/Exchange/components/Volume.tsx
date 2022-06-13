import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

export interface DataProp {
  time: number
  value: number
}

interface Props {
  data: DataProp[]
  volume: number
  loading?: boolean
}

export default function Volume({ data, volume, loading }: Props) {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant='body2' sx={{ fontWeight: 500, mb: '6px' }}>
        {t('btcVolume24h')}:{' '}
        <Typography variant='body1' component='span'>
          {volume} BTC
        </Typography>
      </Typography>
      {loading && <CircularProgress />}
      <Box maxWidth='300px' height='200px'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart width={300} height={100} data={data}>
            <Line dot={false} type='monotone' dataKey='value' stroke='#82d116' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  )
}
