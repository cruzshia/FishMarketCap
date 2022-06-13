import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook'
import { fetchExchangeAsync, selectExchange, fetchVolumeAsync, selectVolumeData } from './exchangeRedux'
import { ROUTE_PATH } from '@/AppRoutes'
import SocailMeida from './components/SocialMedia'
import InfoItem from './components/InfoItem'
import Volume, { DataProp } from './components/Volume'

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

  useEffect(() => {
    if (!id) return
    dispatch(fetchExchangeAsync(id))
    dispatch(fetchVolumeAsync({ id, days: 1 }))
  }, [id, dispatch])

  const chartData = useMemo(
    () =>
      volumeData.reduce((acc, data) => {
        acc.push({ time: data[0], value: data[1] })
        return acc
      }, [] as DataProp[]),
    [volumeData]
  )

  return (
    <div>
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
      {data && (
        <Box sx={{ pt: '20px', mb: '10px' }}>
          <Grid container alignItems='center'>
            <Logo src={data.image} alt={data.name} />
            <div>
              <Typography variant='h6' lineHeight='20px'>
                {data.name}
              </Typography>
              <Typography variant='caption'>@{data.country}</Typography>
            </div>
          </Grid>
          <Box sx={{ m: '20px 0 10px' }}>
            <InfoItem label={t('trustRank')} info={data.trust_score_rank} />
            <InfoItem label={t('yearEstablished')} info={data.year_established} />
            {data.description && (
              <Typography variant='body1' sx={{ m: '10px 0' }}>
                {data.description}
              </Typography>
            )}
            <Volume volume={data.trade_volume_24h_btc} data={chartData} />
            <SocailMeida {...data} />
          </Box>
        </Box>
      )}
    </div>
  )
}
