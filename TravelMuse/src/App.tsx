import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './Pages/Home'
import Maps from './Pages/Map'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
