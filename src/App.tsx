import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { Browse } from './pages/browse'
import { MovieDetails } from './pages/movie-details'
import { MyList } from './pages/my-list'
import { Search } from './pages/search'
import { Callback } from './pages/callback'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Browse />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="my-list" element={<MyList />} />
        <Route path="search" element={<Search />} />
        <Route path="callback" element={<Callback />} />
      </Route>
    </Routes>
  )
}