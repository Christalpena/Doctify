import { useEffect, useState } from 'react'
import './App.css'
import Api from './components/documentation'
import Header from './components/header/index'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
function App() {
  const [fields,setFields] = useState({})
  const [data,setData] = useState()

  const setRequired = (field: string, valor: boolean) => {
    if (field in fields){
      setFields((prevState: any) => ({ ...prevState, [field]: valor }));
    }
  };
  const data2:any = data ? data : ''
  
  useEffect(() => {
    Object.keys(data2).map((key) => {
      setFields((prevState: any) => ({ ...prevState, [key]: true }))
    })
  },[data])

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
          setRequired={setRequired}
          />
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
