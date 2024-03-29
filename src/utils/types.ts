export type Photos = {
  id: number
  photographer: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    landscape: string
    tiny: string
  }
  alt: string
}

export type useGlobalContextType = {
  photos: Photos[]
  setPhotos: (value: Photos[]) => void
  page: number
  setPage: (value: number) => void
  loading: boolean
  setLoading: (value: boolean) => void
  classActive: boolean
  setClassActive: (value: boolean) => void
  favourite: Photos[]
  setFavourite: (value: Photos[]) => void
  search: string
  setSearch: (value: string) => void
  hasMoreData: boolean
}

export type useFetchImagesResponseType = {
  page: number
  per_page: number
  photos: Photos[]
  total_results: number
  next_page: string
}

export type useFetchImagesParamsType = {
  query: string
  page: number
}

export type useFetchImagesReturnType = {
  data: useFetchImagesResponseType | null
  error: boolean | null
  isLoading: boolean
  hasMore: boolean
}
