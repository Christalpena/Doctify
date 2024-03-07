import axios from 'axios';
import { useState } from 'react';
import Input from '../elements/input';
import BasicTabs from '../elements/taps';
import "./documentationTemplate.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';

const Api = (props:any) => {
    const {fields, setFields,data,setData} = props
    const [getUrl,setGetUrl] = useState();
    const [postUrl,setPostUrl] = useState();
    const [deleteUrl,setDeleteUrl] = useState();
    const [putUrl,setPutUrl] = useState();
    const [path,setPath] = useState();
    const [error,setError] = useState();

    const delay = (ms:number) => new Promise(
        resolve => setTimeout(resolve, ms)
      );
      
    const notify = () => toast("Documentacion Generada!");


    const getData = async (url:any,dataPath:any) => {
        try {
            const response = await axios.get(url);
            let data = response.data;
            console.log(data)
            {dataPath ? setData(data[dataPath][0]) : data.length === undefined ? setData(data) : setData(data[0])};
            await delay(100)
            notify();
        } catch (err) {
            setData('')
            setError(err)
        };
    };

    const genarateDocumentation = (e:any) => {
        e.preventDefault();
        getData(getUrl,path);
    };

    return(
        <main >
        <section className='home'>
            <section className='api-inputs'>
                <h2>API JSON URLs</h2>
                <form action="" method="post" onSubmit={genarateDocumentation}>
                <Input type={"url"} id={'GET'} url={setGetUrl} required={true}/>
                <Input type={"text"} id={"PATH"} url={setPath} />
                <Input type={"url"} id={'POST'} url={setPostUrl}/>
                <Input type={"url"} id={'PUT'} url={setPutUrl}/>
                <Input type={"url"} id={'DELETE'} url={setDeleteUrl}/>
                <button className='btn' type="submit">Generar Documentacion</button>
                </form>

                <div className='api-inputs-nota'>
                    <h1>Nota</h1>
                    <p>A la unica url que se le estara aplicando una peticion sera a la GET las otras solo se agregaran en el documento y se genera informacion apartir de esta.</p>
                    <a>¡Mas Informacion aqui!</a>
                </div>

            </section>
           
            { data ?
            <section className='documentationSection'>
                <BasicTabs
                    data={data}
                    getUrl={getUrl}
                    postUrl={postUrl}
                    putUrl={putUrl}
                    deleteUrl={deleteUrl}
                    fields={fields}
                    setFields={setFields}
                />:
            </section> : 
            error ? 
            <section className='errorSection'>
                <div>
                    <h1>Hay algun error en la URL por davor revisela</h1>
                    <ReportProblemTwoToneIcon
                    color='error'
                    fontSize='10rem'
                    className='error__icon'
                    />
                </div>
            </section> :<></>
            }
        </section>
        <ToastContainer />
        </main>
    )
}

export default Api