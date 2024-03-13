import { useEffect, useState, useRef } from 'react'

import { useAppContext } from '../../contexts/AppContext'
import './Image.scss'
import { Photos } from '../../utils/types'


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
    const imgRef = useRef<HTMLImageElement>(null)
    const [loaded, setLoaded] = useState(false)

    const { favourite, setFavourite } = useAppContext()

    const inFav = favourite.some((photo) => photo.id === url?.id)

    const srcset = `${url?.src?.original} 940w, ${url?.src?.large} 940w, ${url?.src?.medium} 350w, ${url?.src?.small} 130w, ${url?.src?.landscape} 1200w, ${url?.src?.tiny} 280w`

    useEffect(() => {
        const storedData = localStorage.getItem('favourite')
        if (storedData) {
            setFavourite(JSON.parse(storedData))
        }
    }, [setFavourite])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !loaded) {
                    imgRef.current!.src = url.src.medium
                    setLoaded(true)

                    observer.unobserve(imgRef.current!)
                }
            })
        })
        observer.observe(imgRef.current!)

        return () => {
            observer.disconnect()
        }
    }, [loaded, favourite])

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
                            {title}
                        </div>
                        <div className="line-sep"></div>
                        <div className="extra-text">{author}</div>
                        {inFav ?
                            <button className="image-button" onClick={() => removeFromFavourite(url.id)} >Remove</button> :
                            <button className="image-button" onClick={() => addToFavourite(url)} >Favourite</button>
                        }
                    </div>
                </div>
                <img
                    ref={imgRef}
                    className='images'
                    src={url.src.tiny}
                    alt="img"
                    loading='lazy'
                    srcSet={srcset}
                />
            </div>
        </>
    )
}

export default Image