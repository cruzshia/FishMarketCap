import { Subject } from 'rxjs'

export const statusSubject = new Subject<{
  source?: string
  loading?: boolean
  failed?: boolean
  success?: boolean
}>()
