import { model, Schema } from 'mongoose'
import { AccountType } from '../../typing/types.js'

export interface User {
  _id: string
  username: string
  createdAt?: Date
  accountType: AccountType
  email?: string
}

export const User = model(
  'users',
  new Schema<User>({
    _id: String,
    username: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    accountType: { type: String, required: true },
    email: String,
  })
)

export class Users {
  static all() {
    return User.find().exec()
  }

  static byId(_id: string, accountType?: AccountType) {
    return User.findOne(accountType ? { _id, accountType } : { _id })
  }

  static async findOrCreate(user: User) {
    const found = await this.byId(user._id, user.accountType)
    if (found) return found
    const created = new User(user)
    await created.save()
    return created
  }
}
