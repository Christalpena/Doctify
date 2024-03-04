import { useState } from 'react'
import './App.css'
import Api from './components/documentation'
import Header from './components/header/index'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
function App() {
  const [fields,setFields] = useState({})

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/doctify'/>}></Route>
        <Route path='/doctify' element={
          <Api
          fields={fields}
          setFields={setFields}
          />
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
