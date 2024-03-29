import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

import {
    Photos,
    useFetchImagesReturnType,
    useGlobalContextType
} from "../utils/types"
import useFetchImages from "../hooks/use-fetch-images/useFetchImages"


const AppContext = createContext<useGlobalContextType | null>(null)

const AppProvider = ({ children }: { children: ReactNode }) => {

    const [photos, setPhotos] = useState<Photos[]>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [favourite, setFavourite] = useState<Photos[]>([])
    const [search, setSearch] = useState<string>('')
    const [classActive, setClassActive] = useState<boolean>(false)
    const [hasMoreData, setHasMoreData] = useState<boolean>(false)

    const {
        data,
        hasMore,
        isLoading
    }: useFetchImagesReturnType = useFetchImages({ query: search, page })

    useEffect(() => {
        setLoading(isLoading)
        setHasMoreData(hasMore)
    }, [hasMore, isLoading])

    useEffect(() => {
        if (search === '') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setPage(1)
            setPhotos([])
        }
        if (search) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setPage(1)
            setPhotos([])
        }
    }, [search])

    useEffect(() => {
        if (data) {
            const imgExists = data.photos.some(newImg => photos.some(img => img.src.original === newImg.src.original))
            if (!imgExists) {
                setPhotos(prev => [...prev, ...data.photos])
            }
        }
    }, [data])

    return (
        <AppContext.Provider
            value={{
                photos,
                setPhotos,
                page,
                setPage,
                loading,
                setLoading,
                favourite,
                setFavourite,
                search,
                setSearch,
                classActive,
                setClassActive,
                hasMoreData
            }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider')
    }
    return context
}

export { AppContext, AppProvider, useAppContext }