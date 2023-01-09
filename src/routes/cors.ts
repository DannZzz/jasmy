import cors from 'cors'

export const testingCors = () => cors({ origin: ['http://localhost:3000'] })
