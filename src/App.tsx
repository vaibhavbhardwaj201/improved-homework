import './App.scss'
import { Loader, Navbar, NoImages, Overlay, SearchBar, ImageCard } from './components'
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
      {photos.length > 0 ?
        <ImageCard />
        :
        loading ? null : <NoImages />}
    </>
  )
}

export default App
