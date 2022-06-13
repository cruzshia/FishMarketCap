import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnType, DefaultRecordType } from 'rc-table/lib/interface'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import Table from '@/components/Table'
import { ROUTE_PATH } from '@/AppRoutes'
import { Exchange } from '../exchangeListApi'

interface Props {
  data: Exchange[]
  loading?: boolean
}

function ExchangeTable({ data, loading }: Props) {
  const { t } = useTranslation()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const columns: ColumnType<DefaultRecordType>[] = useMemo(
    () => [
      {
        title: t('exchange'),
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: matches ? 160 : 200,
        render: (value, data) => {
          return (
            <Link color='inherit' underline='none' href={ROUTE_PATH.EXHCANGE.replace(':id', data.id)} target='_blank'>
              <Grid container alignItems='center'>
                <Avatar sx={{ mr: '10px', width: '20px', height: '20px' }} alt={data.name} src={data.image} />
                <Grid alignItems={'center'} sx={{ flex: 1 }}>
                  {value} {matches && <Chip size='small' label={data.trust_score_rank} />}
                </Grid>
              </Grid>
            </Link>
          )
        }
      },
      ...(!matches
        ? [{ title: t('trustRank'), dataIndex: 'trust_score_rank', key: 'trust_score_rank', width: 120 }]
        : []),
      {
        title: t('country'),
        dataIndex: 'country',
        width: 200,
        key: 'country'
      },
      {
        title: t('url'),
        dataIndex: 'url',
        key: 'url',
        render: (value) => (
          <Link href={value} rel='noreferrer' underline='none' target='_blank'>
            {value}
          </Link>
        )
      }
    ],
    [t, matches]
  )

  return <Table columns={columns} data={data} loading={loading} />
}

export default ExchangeTable
