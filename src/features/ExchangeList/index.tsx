import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook'
import { selectExchangeList, fetchExchangeListAsync, FETCH_SOURCE } from './exchangeListRedux'
import ExchangeTable from './components/ExchangeTable'
import useLoading from '@/hooks/useLoading'

export default function ExchangeList() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectExchangeList)
  const [page, setPage] = useState<number>(1)
  const hasMore = data.length > 0 && data.length % 20 === 0
  const { loading } = useLoading({ source: FETCH_SOURCE })

  const handleClickMore = useCallback(() => {
    setPage((page) => page + 1)
  }, [])

  useEffect(() => {
    dispatch(fetchExchangeListAsync({ page, loadMore: page > 1 }))
  }, [dispatch, page])

  return (
    <>
      <ExchangeTable data={data} loading={loading} />
      {hasMore && (
        <Box sx={{ textAlign: 'center', mt: '10px' }}>
          <LoadingButton data-cy='load-more' loading={loading} onClick={handleClickMore}>
            {t('showMore')}
          </LoadingButton>
        </Box>
      )}
    </>
  )
}
