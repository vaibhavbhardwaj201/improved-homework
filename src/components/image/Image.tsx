import { useEffect, useState } from 'react'

import { useAppContext } from '../../contexts/AppContext'
import './Image.scss'
import { Photos } from '../../utils/types'
import { ImagePlaceholder } from '..'


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

    const { favourite, setFavourite } = useAppContext()

    const inFav = favourite.some((photo) => photo.id === url?.id)

    const srcset = `
    ${url?.src?.original} 1600w, 
    ${url?.src?.landscape} 1200w,
    ${url?.src?.large2x} 940w, 
    ${url?.src?.large} 500w, 
    ${url?.src?.medium} 340w, 
    ${url?.src?.tiny} 280w
    ${url?.src?.small} 180w, 
`

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

    return (
        <>
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
                    className="images"
                    src={url.src.medium}
                    alt="img"
                    loading='lazy'
                    srcSet={srcset}
                    sizes='(max-width: 650px) calc((100vw - 45px) / 2), (max-width: 900px) calc((100vw - 45px) / 2), (max-width: 1440px) calc((100vw - 100px) / 3), (max-width: 1600px) calc((100vw - 200px) / 3), calc((1600px - 200px) / 3)'
                    onLoad={() => setShowPlaceholder(false)}
                />
            </div>
        </>
    )
}

export default Image