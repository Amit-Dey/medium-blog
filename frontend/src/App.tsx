// Router imports
import { BrowserRouter, Routes,Route } from 'react-router-dom'

// Page imports
import {Home} from './pages/Home'
import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import {Blog} from './pages/Blog'
import {Write} from './pages/Write'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
