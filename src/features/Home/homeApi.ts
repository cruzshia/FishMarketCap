import axios from '@/http/axios'

export const fetchExchangeList = () => axios.get('/exchanges/list')
