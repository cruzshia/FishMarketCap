import { useState, useEffect } from 'react'
import { statusSubject } from '@/utils/status'

interface Props {
  source?: string
}

/** a hooks detect is there any loading request */

export default function useLoading({ source }: Props) {
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const subcription = statusSubject.asObservable().subscribe((payload) => {
      if (!source || source === payload.source) {
        setLoading(!!payload.loading)
      }
    })

    return () => {
      subcription.unsubscribe()
    }
  }, [source])

  return {
    loading
  }
}
