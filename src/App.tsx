import { useState } from 'react'
import './App.css'
import Api from './components/documentation'
import Header from './components/header/index'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
function App() {
  const [fields,setFields] = useState({})
  const [data,setData] = useState()

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/doctify'/>}></Route>
        <Route path='/doctify' element={
          <Api
          fields={fields}
          setFields={setFields}
          data={data}
          setData={setData}
          />
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
