import { useEffect, useState } from "react"

import {
  useFetchImagesParamsType,
  useFetchImagesResponseType,
} from "../../utils/types"

const API_KEY = import.meta.env.VITE_APP_PEXELS_API_KEY
const BASE_URL = import.meta.env.VITE_APP_BASE_URL

const useFetchImages = ({ query, page }: useFetchImagesParamsType) => {
  const [data, setData] = useState<useFetchImagesResponseType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | null>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)

  if (!query) query = "popular"

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(false)
      try {
        const response = await fetch(
          BASE_URL + `${query}&page=${page}&per_page=12`,
          {
            method: "GET",
            headers: {
              Authorization: API_KEY,
            },
          },
        )
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data: useFetchImagesResponseType = await response.json()
        setData(data)
        setHasMore(data.photos.length > 0)
        setIsLoading(false)
      } catch (e) {
        setError(true)
        throw new Error("Network response was not ok")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [query, page])

  return { data, isLoading, error, hasMore }
}

export default useFetchImages
