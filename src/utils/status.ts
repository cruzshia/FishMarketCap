import { Subject } from 'rxjs'

export const statusSubject = new Subject<{
  loading?: boolean
  failed?: boolean
  success?: boolean
}>()
