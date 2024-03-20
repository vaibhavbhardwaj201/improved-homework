import { useEffect, useMemo, useState } from 'react'

import './Image.scss'
import { useAppContext } from '../../contexts/AppContext'
import { Photos } from '../../utils/types'
import { ImagePlaceholder } from '../index'


interface ImageProps {
    title: string
    author: string
    url: Photos
}

const Image = ({
    title,
    author,
    url
}: ImageProps) => {
    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true)
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    const { favourite, setFavourite } = useAppContext()

    const inFav = favourite.some((photo) => photo.id === url?.id)

    const srcset = useMemo(() => {
        return `
    ${url?.src?.original} 2080w, 
    ${url?.src?.landscape} 1200w,
    ${url?.src?.large2x} 940w, 
    ${url?.src?.large} 500w, 
    ${url?.src?.medium} 340w, 
    ${url?.src?.tiny} 280w
    ${url?.src?.small} 180w, 
`
    }, [url.src])

    useEffect(() => {
        const storedData = localStorage.getItem('favourite')
        if (storedData) {
            setFavourite(JSON.parse(storedData))
        }
    }, [setFavourite])

    const removeFromFavourite = (id: number) => {
        const newFav = favourite.filter((photo) => photo.id !== id)
        setFavourite(newFav)
        localStorage.setItem('favourite', JSON.stringify(newFav))
    }

    const addToFavourite = (url: Photos) => {
        if (!inFav) {
            const newFav = [...favourite, url]
            setFavourite(newFav)
            localStorage.setItem('favourite', JSON.stringify(newFav))
        }
    }

    const onImageLoad = () => {
        setShowPlaceholder(false)
        setImageLoaded(true)
    }

    return (
        <div className='card'>
            <div className="image-overlay">
                <div className="overlay-text">
                    <div className="title-text">
                        {title.split(' ').slice(0, 3).join(' ')}
                    </div>
                    <div className="line-sep"></div>
                    <div className="extra-text">{author}</div>
                </div>
                {inFav ?
                    <button className="image-button" onClick={() => removeFromFavourite(url.id)} >Remove</button> :
                    <button className="image-button" onClick={() => addToFavourite(url)} >Favourite</button>
                }
            </div>
            {showPlaceholder && <ImagePlaceholder />}
            <img
                className={`images ${imageLoaded ? 'loaded' : ''}`}
                src={url.src.medium}
                alt="img"
                loading='lazy'
                srcSet={srcset}
                sizes='(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw'
                onLoad={onImageLoad}
            />
        </div>
    )
}

export default Image