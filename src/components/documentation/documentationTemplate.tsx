import { useRef } from 'react';
import "./documentationTemplate.css"
import { iterateObjectTable, requiredParameters,iterateObject } from './data';
import ReactToPrint from "react-to-print";

const DocumentationTemplate = (props:any) => {
  
    const {data,getUrl,postUrl,deleteUrl,putUrl,fields,setFields,setRequired} = props

    const [putParameter,putParameterRequired,deleteParameter,deleteParameterRequired] = requiredParameters(fields,putUrl,deleteUrl)
    console.log(fields)
    const ref:any = useRef<HTMLDivElement>();

    return(
        <section>
          <ReactToPrint
              bodyClass="print-document"
              content={() => ref.current}
              trigger={() => (
                  <button className='btn'>Generar</button>
              )}/>
          <div ref={ref} id='content'>
            <div>

              <h2 className='title'>API DOCUMENTATION</h2>

              <h3>Base URL</h3>
              <h5>{getUrl}</h5>
            </div>
            <hr />
            <div className='endPoints'>
                <h3>EndPoints</h3>
                <div>
                { getUrl ? 
                    <h4 className='get' style={{outline:'2px solid'}}>GET</h4>
                : <></> 
                }
                { postUrl ? 
                    <h4 className='post' style={{outline:'2px solid'}}>POST</h4>
                : <></> 
                }
                { deleteUrl ? 
                    <h4 className='delete' style={{outline:'2px solid'}}>DELETE</h4>
                : <></> 
                }
                {  putUrl ? 
                    <h4 className='put' style={{outline:'2px solid'}}>PUT</h4>
                : <></> 
                }
                </div>
                
            </div>
            <hr />
            <div className='fields-section'>
                <h3>Campos</h3>

                    <div className='fieldsUl' >
                      <span>&#123;</span>
                    <ul>
                    {
                      iterateObject(data,'',fields,setFields,setRequired)
                    }
                    </ul>
                    <span>&#125;</span>
                    </div>
            </div> 
            <hr />
            <section>
                <h3>Responses</h3>  
                <div>
                    <div className='response-container'>
                        <h2 className='get'>GET</h2>
                        <strong>URL: </strong><span>{getUrl}</span>
                        <div className='response-list'>
                        <span>&#123;</span>

                            {
                            iterateObject(data,'get',fields,setFields,setRequired)
                            }
                        <span>&#125;</span>

                        </div>
                    </div>
                    { postUrl ?
                    <div className='response-container' >
                        <hr />
                        <h2 className='post'>POST</h2>
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
                            <tbody id='tbodyParent'>
                            {iterateObjectTable(data,fields,setFields)}
                            </tbody>
                          </table>

                        </div>
                    </div> : <></>}

                    { putUrl ?
                    <div className='response-container' >
                        <hr />
                        <h2 className='put'>PUT</h2>
                        <strong>URL: </strong><span>{putUrl}</span>
                        <div>
                          <table>
                            <tbody>
                              <tr>
                                <th>Campos</th>
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
                    
                    <div className='response-container' >
                        <hr />
                        <h2 className='delete'>DELETE</h2>
                        <strong>URL: </strong><span>{deleteUrl}</span>
                        <div>
                          <table>
                            <tbody>
                              <tr>
                                <th>Campos</th>
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
          </div>
        </section>
    )
}

export default DocumentationTemplate