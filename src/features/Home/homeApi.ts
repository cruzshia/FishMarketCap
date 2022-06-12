import axios from '@/http/axios'

export interface Exchange {
  id: string
  name: string
  country: string
  url: string
  trade_volume_24h_btc: number
  trade_volume_24h_btc_normalized: number
  has_trading_incentive: boolean
  trust_score: number
  trust_score_rank: number
  year_established: number

  description?: string
  image?: string
}

export const fetchExchangeList = () => axios.get<Exchange[]>('/exchanges?per_page=20')
