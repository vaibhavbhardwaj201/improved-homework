import { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import './SearchBar.scss'

const SearchBar = () => {
    const { setSearch, setPhotos, photos, setPage } = useAppContext()
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch(searchValue)
            if (!photos) setPhotos([])
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchValue, setSearch])

    const handleSetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        setPage(1)
    }

    return (
        <div className="search-bar">
            <div className='search-form'>
                <img src='/search-icon.svg' alt='search-icon' className='search-icon' width={20} height={20} />
                <input
                    className='textfield'
                    type="text"
                    value={searchValue}
                    placeholder='Search for items'
                    onChange={handleSetSearch}
                    autoComplete='off'
                    name='search' />
            </div>
        </div>
    )
}

export default SearchBar