import './App.css'
import Api from './components/documentation'
import Header from './components/header/index'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/doctify'/>}></Route>
        <Route path='/doctify' element={<Api />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
