import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.tsx'
import StoryBoard from './pages/StoryBoard.tsx'
import MovieEditor from './pages/MovieEditor.tsx'
import MovieCreator from './pages/MovieCreator.tsx'
import Result from './pages/Result.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/storyboard" element={<StoryBoard />} />
          <Route path="/edit-movie" element={<MovieEditor />} />
          <Route path="/create-movie" element={<MovieCreator />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
