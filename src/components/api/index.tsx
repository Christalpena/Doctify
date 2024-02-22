import axios from 'axios';
import "./apiTemplate.css"
import { useState } from 'react';
import Input from './input';
import Checkbox from '@mui/material/Checkbox';
import DocumentationTemplate from './documentationTemplate';


const Api = () => {
    const [data,setData] = useState()
    const [getUrl,setGetUrl] = useState()
    const [postUrl,setPostUrl] = useState()
    const [deleteUrl,setDeleteUrl] = useState()


    const getData = async (url:any) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            setData(data.todos[0])
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    }

    const genarateDocumentation = (e:any) => {
        e.preventDefault();
        console.log(getUrl)
        console.log(postUrl)
        console.log(deleteUrl)
        getData(getUrl)
    }

    
    return(
        <section className='api-section'>
            <h3>Enter your API Json URL</h3>

            <div className='api-inputs'>

                <Input id={'GET'} url={setGetUrl}/>
                <Input id={'POST'} url={setPostUrl}/>
                <Input id={'DELETE'} url={setDeleteUrl}/>
                <button className='btn' onClick={genarateDocumentation} type="submit">Generate Documentation</button>
            </div>
            { data ? 
            <div className='parameters-section'>
                <h3>Cuales parametros son requeridos?</h3>
                <ul>
                    
                    {Object.keys(data).map((clave, index) => (
                        <li key={index}>
                            <strong>{clave}</strong>
                            <Checkbox />
                        </li>
                    )) } 
                
                </ul>
                <button className='btn'>Continuar</button>
            </div> : <></> 
            }
            <div className='documentationSection'>
                <DocumentationTemplate />
            </div>
        </section>
    )
}

export default Api