declare type IllustType = 'illust'
declare type ImageUrls = {
  square_medium: string
  medium: string
  large: string
}
declare type Illust = {
  caption: string
  create_date: string
  height: number
  id: number
  illust_ai_type: number
  illust_book_style: number
  image_urls: ImageUrls
  is_bookmarked: boolean
  is_muted: boolean
  meta_pages: Array
  meta_single_page: Object
  page_count: number
  restrict: number
  sanity_level: number
  series: null
  tags: Array
  title: string
  tools: Array
  total_bookmarks: number
  total_view: number
  type: IllustType
  user: User
  visible: boolean
  width: number
  x_restrict: number
}

declare type User = {
  account: string
  id: number
  is_followed: boolean
  name: string
  profile_image_urls: {
    medium: string
  }
}

declare type IllustsRes = {
  illusts: Illust[]
  next_url: string
}

declare type RecommendedRes = {
  illusts: Illust[]
  ranking_illusts: Illust[]
  next_url: string
}
