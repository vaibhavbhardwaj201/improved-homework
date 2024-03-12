import { Image } from '../index'
import { useAppContext } from "../../contexts/AppContext"
import './Overlay.scss'

const Overlay = () => {

    const { classActive, favourite } = useAppContext()


    return (
        <div className={classActive ? 'overlay-bar is-active' : 'overlay-bar'}>
            {favourite.map((photo) => (
                <Image
                    key={photo.id}
                    title={photo.alt}
                    author={photo.photographer}
                    url={photo}
                />
            ))}
        </div>
    )
}

export default Overlay