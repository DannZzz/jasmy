import { model, Schema } from 'mongoose'

export interface Button {
  type:
    | 'custom'
    | 'instagram'
    | 'facebook'
    | 'tiktok'
    | 'discord'
    | 'twitch'
    | 'youtube'
    | 'vk'
    | 'spotify'
    | 'twitter'
  label: string
  url: string
  iconImage?: string
  color?: string
}

export interface Page {
  ownerId: string
  mainAvatarUrl?: string
  background?: { type: 'color' | 'image'; value: string }
  textColor?: string
  texts?: {
    short?: string
    long?: string
  }
  buttons?: Array<Button>
}

export const Page = model(
  'pages',
  new Schema<Page>({
    ownerId: String,
    mainAvatarUrl: { type: String, default: null },
    background: { type: Object, default: null },
    textColor: { type: String, default: null },
    texts: { type: Object, default: null },
    buttons: { type: Array as any, default: [] },
  })
)

export class Pages {
  static async findOrCreate(page: Page) {
    const found = await Page.findOne({ ownerId: page.ownerId })
    if (found) return found
    const created = new Page(page)
    await created.save()
    return created
  }
}
