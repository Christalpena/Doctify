import { useEffect, useState } from 'react';
import "./documentationTemplate.css"
import { saveFields, iterateObjectTable, requiredParameters,iterateObject } from './data';

const DocumentationTemplate = (props:any) => {
    const {data,getUrl,postUrl,deleteUrl,putUrl} = props
    const [fields,setfields] = useState({})
    
    useEffect(() => {
      setfields(saveFields(data))
    },[data])
    
    const [putParameter,putParameterRequired,deleteParameter,deleteParameterRequired] = requiredParameters(fields,putUrl,deleteUrl)

    return(
        <section>
            <h2>API DOCUMENTATION</h2>
            <div>

            </div>
            <div>
                <h3>Base URL</h3>
                {getUrl}
            </div>
            <hr />
            <div className='endPoints'>
                <h3>EndPoints</h3>
                <div>
                { getUrl ? 
                    <h4 style={{outline:'2px solid green'}}>GET</h4>
                : <></> 
                }
                { postUrl ? 
                    <h4 style={{outline:'2px solid blue'}}>POST</h4>
                : <></> 
                }
                { deleteUrl ? 
                    <h4 style={{outline:'2px solid red'}}>DELETE</h4>
                : <></> 
                }
                {  putUrl ? 
                    <h4 style={{outline:'2px solid orange'}}>PUT</h4>
                : <></> 
                }
                </div>
                
            </div>
            <hr />
            <div className='parameters-section'>
                <h3>Campos</h3>

                    <div >
                      <span>&#123;</span>
                    {
                      iterateObject(data,'',fields,setfields)
                    }
                    <span>&#125;</span>
                    </div>
            </div> 
            <hr />
            <section>
                <h3>Responses</h3>  
                <div>
                    <div>
                        <h2>GET</h2>
                        <strong>URL: </strong><span>{getUrl}</span>
                        <div className='response-list'>
                        <span>&#123;</span>

                            {
                            iterateObject(data,'get',fields,setfields)
                            }
                        <span>&#125;</span>

                        </div>
                    </div>

                    { postUrl ?
                    <div >
                        <h2>POST</h2>
                        <strong>URL: </strong><span>{postUrl}</span>
                        <h3>REQUEST BODY</h3>

                        <div>
                          <table>
                            <thead>
                              <tr>
                                <th>Campo</th>
                                <th>Tipo</th>
                                <th>Requerido</th>
                              </tr>
                            </thead>
                            <tbody>
                            {iterateObjectTable(data,fields)}
                            </tbody>
                          </table>

                        </div>
                    </div> : <></>}

                    { putUrl ?
                    <div >
                        <h2>PUT</h2>
                        <strong>URL: </strong><span>{putUrl}</span>
                        <div>
                          <table>
                            <tbody>
                              <tr>
                                <th>fields</th>
                                <th>Tipo</th>
                                <th>Requerido</th>
                              </tr>
                              <tr>
                                <th>{putParameter}</th>
                                <th>{typeof data[putParameter]}</th>
                                <th>{putParameterRequired ? 'Si' : 'No'}</th>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                    </div> : <></>}
                    { deleteUrl ?
                    <div >
                        <h2>DELETE</h2>
                        <strong>URL: </strong><span>{deleteUrl}</span>
                        <div>
                          <table>
                            <tbody>
                              <tr>
                                <th>fields</th>
                                <th>Tipo</th>
                                <th>Requerido</th>
                              </tr>
                              <tr>
                                <th>{deleteParameter}</th>
                                <th>{typeof data[deleteParameter]}</th>
                                <th>{deleteParameterRequired ? 'Si' : 'No'}</th>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                    </div> : <></>}
                </div>
            </section>
        </section>
    )
}

export default DocumentationTemplate