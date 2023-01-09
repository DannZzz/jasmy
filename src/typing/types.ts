export enum ProfileApi {
  google = 'https://www.googleapis.com/oauth2/v3/userinfo',
}

export type AccountType = keyof typeof ProfileApi
