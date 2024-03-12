import { useEffect, useState } from 'react'
import './App.css'
import Api from './components/documentation'
import Header from './components/header/index'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

function App() {
  const [getFields,setGetFields] = useState({});
  const [postFields,setPostFields] = useState({});
  const [data,setData] = useState();

  const setRequiredGetFields = (field: string, valor: boolean) => {
    setGetFields((prevState: any) => ({ ...prevState, [field]: valor }));
    if(field in postFields){
      setRequiredPostFields(field,valor);
    };
  };

  const setRequiredPostFields = (field: string, valor: boolean) => {
    setPostFields((prevState: any) => ({ ...prevState, [field]: valor }));
  };

  const data2:any = data ? data : '';
  
  useEffect(() => {
    setGetFields({})
    setPostFields({})
    Object.keys(data2).map((key) => {
      setGetFields((prevState: any) => ({ ...prevState, [key]: true }));
      setPostFields((prevState: any) => ({ ...prevState, [key]: true }));
    });
  },[data]);

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/doctify'/>}></Route>
        <Route path='/doctify' element={
          <Api
          getFields={getFields}
          setGetFields={setGetFields}
          data={data}
          setData={setData}
          setRequiredGetFields={setRequiredGetFields}
          postFields={postFields}
          setPostFields={setPostFields}
          setRequiredPostFields={setRequiredPostFields}
          />
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
