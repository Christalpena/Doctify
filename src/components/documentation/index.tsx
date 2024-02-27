import axios from 'axios';
import { useState } from 'react';
import Input from '../elements/input';
import BasicTabs from '../elements/taps';
import "./documentationTemplate.css"

const Api = () => {
    const [data,setData] = useState()
    const [getUrl,setGetUrl] = useState()
    const [postUrl,setPostUrl] = useState()
    const [deleteUrl,setDeleteUrl] = useState()
    const [putUrl,setPutUrl] = useState()

    const getData = async (url:any) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            {data.length === undefined ? setData(data) : setData(data[0])}
        } catch (err) {
            console.error(err);
        }
    }

    const genarateDocumentation = (e:any) => {
        e.preventDefault()
        console.log(getUrl)
        getData(getUrl)
    }

    return(
        <main >
            <div className='api-inputs'>
                <h2>API JSON URLs</h2>
                <form action="" method="post" onSubmit={genarateDocumentation}>
                <Input id={'GET'} url={setGetUrl} required={true}/>
                <Input id={'POST'} url={setPostUrl}/>
                <Input id={'PUT'} url={setPutUrl}/>
                <Input id={'DELETE'} url={setDeleteUrl}/>
                <button className='btn' type="submit">Generar Documentacion</button>
                </form>

                <div className='api-inputs-nota'>
                    <h1>Nota</h1>
                    <p>A la unica url que se le estara aplicando una peticion sera a la GET las otras solo se agregaran en el documento y se genera informacion apartir de esta.</p>
                    <a>¡Mas Informacion aqui!</a>
                </div>

            </div>
           
            { data ?
            <section className='documentationSection'>
            {
                data ?
                <BasicTabs
                    data={data}
                    getUrl={getUrl}
                    postUrl={postUrl}
                    putUrl={putUrl}
                    deleteUrl={deleteUrl}
                />: <></>
            }
            
            </section> : <></>
            }
        </main>
    )
}

export default Api