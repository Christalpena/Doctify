import './App.css'
import Api from './components/documentation'
import Header from './components/header/index'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Doctify from './components/doctify'
function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Doctify />}></Route>
        <Route path='/generar-documentacion' element={<Api />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
