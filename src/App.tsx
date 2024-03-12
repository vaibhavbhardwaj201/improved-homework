// import { useEffect } from 'react'
import './App.scss'
import { ImageCard, Loader, Navbar, Overlay, SearchBar } from './components'
import { useAppContext } from './contexts/AppContext'

function App() {

  const { loading } = useAppContext()

  return (
    <>
      <Navbar />
      <Overlay />
      <div className="show-on-mobile">
        <SearchBar />
      </div>
      {loading &&

        <Loader />
      }
      <ImageCard />
      {/* <Loader /> */}
    </>
  )
}

export default App
