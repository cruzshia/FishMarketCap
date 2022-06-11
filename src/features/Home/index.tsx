import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook'
import { selectExchangeList, fetchExchangeListAsync } from './homeRedux'

export default function Home() {
  const dispatch = useAppDispatch()
  const _ = useAppSelector(selectExchangeList)

  useEffect(() => {
    dispatch(fetchExchangeListAsync())
  }, [dispatch])

  return <div></div>
}
