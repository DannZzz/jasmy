import { Response } from 'express'
import HttpStatusCode from './HttpStatusCodes.js'

export default function InvalidForm(
  form: Record<string, any>,
  res: Response
): boolean {
  const invalid: string[] = []
  for (let key in form) {
    if (form[key] === undefined) invalid.push(key)
  }
  if (!!invalid.length) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ error: { message: 'Missing fields: ' + invalid } })
    return true
  }
  return false
}
