import { SERVER_API } from '../config'
import useFetch from '../hooks/useFetch'

export default function LoginUser(user: {
  _id: string
  username: string
  email: string
  accountType: string
  instaUsername?: string
}) {
  const fetchServer = useFetch(SERVER_API)
  const _user = {}
  for (let key in user) {
    if (user[key]) _user[key] = user[key]
  }
  return fetchServer('/api/v1/auth/login', { query: _user })
}
