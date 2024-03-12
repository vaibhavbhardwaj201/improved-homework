import { HeartIcon, SearchBar } from '../index'
import './Navbar.scss'
// import '../App.scss'

const Navbar = () => {

    return (
        <nav className='navbar'>
            <div className="container">
                <div className="logo-container">
                    <img className='logo pointer' src="/logo.svg" alt="logo" />
                </div>
                <div className="hidden-on-mobile">
                    <SearchBar />
                </div>
                <HeartIcon />
            </div>
        </nav>
    )
}

export default Navbar