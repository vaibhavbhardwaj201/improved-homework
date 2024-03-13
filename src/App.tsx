// import { useEffect } from 'react'
import './App.scss'
import { ImageCard, Loader, Navbar, NoImages, Overlay, SearchBar } from './components'
import { useAppContext } from './contexts/AppContext'

function App() {

  const { loading, photos } = useAppContext()

  return (
    <>
      <Navbar />
      <Overlay />
      <div className="show-on-mobile">
        <SearchBar />
      </div>
      {loading && <Loader />}
      {photos.length > 0 ? <ImageCard /> : <NoImages />}
    </>
  )
}

export default App
