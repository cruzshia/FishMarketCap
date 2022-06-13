import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook'
import {
  fetchExchangeAsync,
  selectExchange,
  fetchVolumeAsync,
  selectVolumeData,
  EXCHANGE_SOURCE,
  EXCHANGE_VOLUME
} from './exchangeRedux'
import { ROUTE_PATH } from '@/AppRoutes'
import SocailMeida from './components/SocialMedia'
import InfoItem from './components/InfoItem'
import Volume from './components/Volume'
import useLoading from '@/hooks/useLoading'

const Logo = styled('img')({
  width: '50px',
  height: '50px',
  borderRadius: '10px',
  marginRight: '8px'
})

export default function Exchange() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectExchange)
  const volumeData = useAppSelector(selectVolumeData)
  const { id } = useParams<{ id: string }>()
  const { loading } = useLoading({ source: EXCHANGE_SOURCE })
  const { loading: volumeLoading } = useLoading({ source: EXCHANGE_VOLUME })

  useEffect(() => {
    if (!id) return
    dispatch(fetchExchangeAsync(id))
    dispatch(fetchVolumeAsync({ id, days: 1 }))
  }, [id, dispatch])

  const [labels, chartData] = useMemo(
    () =>
      volumeData.reduce(
        (acc, data) => {
          acc[0].push(`${data[0]}`)
          acc[1].push(data[1])
          return acc
        },
        [[] as string[], [] as number[]]
      ),
    [volumeData]
  )

  return (
    <>
      <Breadcrumbs separator='›' aria-label='breadcrumb'>
        <Link underline='hover' href={ROUTE_PATH.HOME}>
          {t('exchangeList')}
        </Link>
        {data && (
          <Typography color='text.primary' fontWeight={500}>
            {data?.name}
          </Typography>
        )}
      </Breadcrumbs>
      <Box sx={{ margin: '0 auto', width: 'fit-content' }}>
        {loading && <CircularProgress />}
        {data && (
          <Box sx={{ pt: '20px', mb: '10px' }}>
            <Grid container alignItems='center'>
              <Logo src={data.image} alt={data.name} />
              <div>
                <Typography variant='h6' lineHeight='20px' data-cy='exchange-name'>
                  {data.name}
                </Typography>
                <Typography variant='caption'>@{data.country}</Typography>
              </div>
            </Grid>
            <Box sx={{ m: '20px 0 10px' }}>
              <InfoItem label={t('trustRank')} data-cy='exchange-rank' info={data.trust_score_rank} />
              <InfoItem label={t('yearEstablished')} data-cy='exchange-established' info={data.year_established} />
              {data.description && (
                <Typography variant='body1' sx={{ m: '10px 0' }}>
                  {data.description}
                </Typography>
              )}
              <Volume volume={data.trade_volume_24h_btc} labels={labels} data={chartData} loading={volumeLoading} />
              <SocailMeida {...data} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}
