import { useParams } from 'react-router-dom'

export default function Exchange() {
  const { id } = useParams()
  return <div>this is exchange: {id}</div>
}
