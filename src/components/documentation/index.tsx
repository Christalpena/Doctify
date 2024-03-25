import axios from 'axios';
import { useState } from 'react';
import Input from '../elements/input';
import "./documentationTemplate.css"
import 'react-toastify/dist/ReactToastify.css';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { lazy } from 'react';
import { notify } from './documentationTemplate';

const BasicTabs = lazy(() => import('../elements/taps'))

const Api = (props:any) => {
    const {getFields, setGetFields,data,setData,setRequiredGetFields,postFields,setPostFields,setRequiredPostFields} = props
    const [getUrl,setGetUrl] = useState();
    const [postUrl,setPostUrl] = useState();
    const [deleteUrl,setDeleteUrl] = useState();
    const [putUrl,setPutUrl] = useState();
    const [path,setPath] = useState();
    const [error,setError] = useState();
    const [status,setStatus] = useState();
    notify();

    const getData = async (url:any,dataPath:any) => {
        try {
            const response:any = await axios.get(url);
            setStatus(response.status)
            let data = response.data;
            {dataPath ? setData(data[dataPath][0]) : data.length === undefined ? setData(data) : setData(data[0])};
            notify();
        } catch (err:any) {
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
                <h2>API URLs</h2>
                <form action="" method="post" onSubmit={genarateDocumentation}>
                <Input type={"url"} id={'GET'} url={setGetUrl} required={true}/>
                <div className='path-input'>
                    <Input type={"text"} id={"PATH"} url={setPath} />

                    <Tooltip title="Dirección o ubicación donde se encuentra la data." className='tooltip'>
                        <IconButton>
                            <ErrorTwoToneIcon color='success' />
                        </IconButton>
                    </Tooltip>
                </div>
                <Input type={"url"} id={'POST'} url={setPostUrl}/>
                <Input type={"url"} id={'PUT'} url={setPutUrl}/>
                <Input type={"url"} id={'DELETE'} url={setDeleteUrl}/>
                <button className='btn' type="submit">Generar Documentacion</button>
                </form>
                <div className='api-inputs-note'>
                    <h1>Nota</h1>
                    <p>A la unica url que se le estara aplicando una peticion sera a la GET las otras solo se agregaran en el documento y se genera informacion apartir de esta.</p>
                    <a target='_blank' href='https://github.com/Christalpena/Doctify.git'>¡Mas Informacion aqui!</a>
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
                    getFields={getFields}
                    setGetFields={setGetFields}
                    setRequiredGetFields={setRequiredGetFields}
                    postFields={postFields}
                    setPostFields={setPostFields}
                    setRequiredPostFields={setRequiredPostFields}
                    status={status}
                />
            </section> : 
            error ? 
            <section className='errorSection'>
                <div>
                    <h1>Hay algun error en la URL por davor revisela</h1>
                    <ReportProblemTwoToneIcon
                    color='error'
                    fontSize='large'
                    className='error__icon'
                    />
                </div>
            </section> :<></>
            }
        </section>
        </main>
    )
}

export default Api