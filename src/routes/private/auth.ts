import { Router } from 'express'
import { Pages } from '../../db/models/Pages.js'
import { User, Users } from '../../db/models/Users.js'
import HttpStatusCode from '../../utils/HttpStatusCodes.js'
import InvalidForm from '../../utils/InvalidForm.js'

const AuthRouter = Router()

AuthRouter.get('/login', async (req, res) => {
  let { accountType, _id, email, username, instaUsername } =
    req.query as Record<string, string>

  if (InvalidForm({ accountType, _id, email, username }, res)) return

  while (await User.findOne({ username })) {
    username += '1'
  }

  const user = await Users.findOrCreate({
    accountType: accountType as any,
    _id,
    email,
    username,
  })

  const page = await Pages.findOrCreate({
    ownerId: user._id,
    buttons: instaUsername
      ? [
          {
            type: 'instagram',
            label: 'Check out my Insta!',
            url: `https://www.instagram.com/${instaUsername}`,
          },
        ]
      : [],
  })

  res.status(HttpStatusCode.OK).json({ username: user.username })
})

export default AuthRouter
