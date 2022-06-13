import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook'
import { selectExchangeList, fetchExchangeListAsync } from './exchangeListRedux'
import ExchangeTable from './components/ExchangeTable'
import { statusSubject } from '@/utils/status'

export default function ExchangeList() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectExchangeList)
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const handleClickMore = useCallback(() => {
    setPage((page) => page + 1)
  }, [])

  useEffect(() => {
    const subcription = statusSubject.asObservable().subscribe((payload) => {
      setLoading(!!payload.loading)
    })

    return () => {
      subcription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    dispatch(fetchExchangeListAsync({ page, loadMore: page > 1 }))
  }, [dispatch, page])

  return (
    <>
      <ExchangeTable data={data} loading={loading} />
      <Box sx={{ textAlign: 'center', mt: '10px' }}>
        <LoadingButton data-cy='load-more' loading={loading} onClick={handleClickMore}>
          {t('showMore')}
        </LoadingButton>
      </Box>
    </>
  )
}
