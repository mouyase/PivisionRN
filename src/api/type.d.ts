declare type illustType = 'illust'
declare type imageUrls = {
  square_medium: string
  medium: string
  large: string
}
declare type illust = {
  caption: string
  create_date: string
  height: number
  id: number
  illust_ai_type: number
  illust_book_style: number
  image_urls: imageUrls
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
  type: illustType
  user: Object
  visible: boolean
  width: number
  x_restrict: number
}

declare type illustsResponseType = {
  illusts: illust[]
  next_url: string
}
