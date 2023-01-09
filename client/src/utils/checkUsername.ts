export default function checkUsername(username: string) {
  const usernameRegexp = /^[a-z0-9._]+$/
  return usernameRegexp.test(username)
}
