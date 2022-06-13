import axios from '@/http/axios'

export interface ExchangeInfo {
  name: string
  country: string
  url: string
  trade_volume_24h_btc: number
  trade_volume_24h_btc_normalized: number
  has_trading_incentive: boolean
  trust_score: number
  trust_score_rank: number
  year_established: number
  description: string
  image: string
  facebook_url?: string
  reddit_url?: string
  telegram_url?: string
  slack_url?: string
  other_url_1?: string
  other_url_2?: string
  twitter_handle?: string
  centralized: boolean
  public_notice: string
  alert_notice: string
}

export const fetchExchange = (id: string) => axios.get<ExchangeInfo>(`/exchanges/${id}`)

export const fetchVolume = ({ id, days = 7 }: { id: string; days?: number }) =>
  axios.get<number[][]>(`/exchanges/${id}/volume_chart?days=${days}`)
