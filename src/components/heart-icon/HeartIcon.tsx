import { useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'

const HeartIcon = () => {

    const { classActive, setClassActive, favourite } = useAppContext()

    const [filled, setFilled] = useState(false)
    const count = favourite.length

    const handleClick = () => {
        if (favourite.length === 0) {
            setFilled(false)
        } else {
            setFilled(!filled)
        }
    }

    const toggleClass = () => {
        if (favourite.length > 0) {
            setClassActive(!classActive)
            // setFilled(true)
        } else {
            setClassActive(false)
        }
    }

    return (
        <div className="icon-container pointer" onClick={toggleClass}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" onClick={handleClick}>
                <path fill={filled ? "red" : "none"} stroke={filled ? 'red' : 'black'} strokeWidth="2" d="M12,22.4L4.4,15.4C2.4,13.4 1,11.1 1,8.7C1,5.4 3.4,3 6.7,3C8.2,3 9.6,3.6 11,4.7C12.4,3.6 13.8,3 15.3,3C18.6,3 21,5.4 21,8.7C21,11.1 19.6,13.4 17.6,15.4L12,22.4Z" />
                {count && <text x="12" y="16" fontSize="13" fill={filled ? 'white' : 'black'} textAnchor="middle">{count}</text>}
            </svg>
        </div>
    )
}

export default HeartIcon