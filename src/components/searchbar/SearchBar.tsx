import { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import './SearchBar.scss'

const SearchBar = () => {

    const { setSearch } = useAppContext()
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch(searchValue)
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchValue, setSearch])

    const handleSetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="search-bar">
            <div className='search-form'>
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