import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook'
import { selectExchangeList, fetchExchangeListAsync } from './homeRedux'
import ExchangeTable from './components/ExchangeTable'
import { statusSubject } from '@/utils/status'

export default function Home() {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectExchangeList)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const subcription = statusSubject.asObservable().subscribe((payload) => {
      setLoading(!!payload.loading)
    })

    return () => {
      subcription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    dispatch(fetchExchangeListAsync())
  }, [dispatch])

  return <ExchangeTable data={data} loading={loading} />
}
