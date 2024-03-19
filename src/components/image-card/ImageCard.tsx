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
                setTimeout(() => {
                    setPage(page + 1)
                }, 500)
            }
        })
        if (node) observer.current.observe(node)

    }, [loading, setPage, hasMoreData, page])

    return (
        <>
            <div className='cards-container'>
                {photos.map((photo) => {
                    return <Image
                        key={photo.src.original}
                        title={photo.alt}
                        author={photo.photographer}
                        url={photo}
                    />
                })}
            </div>
            <div className="cards-container">
                <div ref={lastImageElementRef}>
                    {loading && <Loader />}
                </div>
            </div>
        </>
    )
}

export default ImageCard