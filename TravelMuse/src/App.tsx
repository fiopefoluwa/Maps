import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './Pages/Home'
import Maps from './Pages/Map'
import './App.css'

function App() {

  return (
    <>
     <section >
      <p className="text-[#949AB5] text-center font-extrabold italic">
                            <a
                                href="https://github.com/fiopefoluwa"
                                className="hover:underline hover:text-black transition underline-offset-4"
                                target="_blank"
                            >
                                Fiopefoluwa
                            </a>{''} && {''}
                            <a
                                href="https://github.com/oyeyemiife"
                                className="hover:underline underline-offset-4 hover:text-black transition"
                                target="_blank"
                            >
                                Ifeoluwa
                            </a>{' '}
                            </p>
      </section>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
        </Routes>
    </BrowserRouter>
   
    </>

  )
}

export default App
