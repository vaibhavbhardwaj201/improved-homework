import { useRef, useCallback, RefCallback } from 'react'

import './ImageCard.scss'
import '../../App.scss'
import { Image, Loader } from '../index'
import { useAppContext } from '../../contexts/AppContext'

const ImageCard = () => {

    const { photos, loading, setPage, hasMoreData, page } = useAppContext()

    const observer = useRef<IntersectionObserver | null>()
    const lastImageElementRef: RefCallback<Element | null> = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMoreData) {
                setPage(page + 1)
            }
        })
        if (node) observer.current.observe(node)

    }, [loading, setPage, hasMoreData, page])


    return (
        <>
            <div className='cards-container'>
                {photos.map((photo, index) => {
                    if (photos.length === index + 1) {
                        return <div
                            ref={lastImageElementRef}
                            key={photo.src.original}
                        >
                            <Image
                                title={photo.alt}
                                author={photo.photographer}
                                url={photo}
                            />
                        </div>
                    } else {
                        return <div
                            key={photo.src.original}
                        >
                            <Image
                                title={photo.alt}
                                author={photo.photographer}
                                url={photo}
                            />
                        </div>
                    }
                })}

            </div>
            <div className="cards-container">
                {loading && <Loader />}
            </div>
        </>
    )
}

export default ImageCard