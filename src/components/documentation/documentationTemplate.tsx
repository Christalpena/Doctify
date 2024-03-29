import { useEffect, useRef } from 'react';
import "./documentationTemplate.css"
import { iterateObjectTable,iterateObject, requiredParameters } from './data';
import ReactToPrint from "react-to-print";
import { ToastContainer, toast } from 'react-toastify';

export const notify = () => toast("Documentacion Generada!");

const DocumentationTemplate = (props:any) => {
  
    const {data,getUrl,postUrl,putUrl,deleteUrl,getFields,setRequiredGetFields,postFields,setPostFields,status} = props;
    const ref:any = useRef<HTMLDivElement>();

    toast.clearWaitingQueue();
    useEffect(() => {
        notify();
    },[data])

    return(
        <section>
        <ToastContainer limit={1}/>   
          <ReactToPrint
              bodyClass="print-document"
              content={() => ref.current}
              trigger={() => (
                  <button className='btn'>Generar</button>
              )}/>
          <section ref={ref} id='content'>
            <div>
              <h2 className='title'>DOCUMENTACION</h2>
              <h3>Base URL</h3>
              <h5 className='urls'>{getUrl}</h5>
            </div>
            <hr />
            <section className='endPoints'>
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
                
            </section>
            <hr />
            <section className='fields-section'>
                <h3>Campos</h3>
                    <div className='fieldsUl' >
                      <span>&#123;</span>
                      <ul>
                      {
                        iterateObject(data,'',getFields,setRequiredGetFields)
                      }
                      </ul>
                      <span>&#125;</span>
                    </div>
            </section> 
            <hr />
            <section>
                <h3>RESPUESTAS</h3>  
                <div>
                    <div className='response-container'>
                        <h2 className='get'>GET</h2>
                        <p className='urls'><strong>URL: </strong>{getUrl}</p>

                        <div className='response-list'>
                        <span>&#123;</span>
                        <br />
                        <strong>"success": {status},</strong>
                        <br />
                        <strong>"data": </strong><span> &#91; &#123;</span>

                            {
                            iterateObject(data,'get',getFields,setRequiredGetFields)
                            }
                        <span>&#125; &#93;,</span>
                        <br />
                        <span>&#125;</span>

                        </div>
                    </div>
                    { postUrl ?
                    <div className='response-container' >
                        <hr />
                        <h2 className='post'>POST</h2>
                        <p className='urls'><strong>URL: </strong>{postUrl}</p>
                        <h3>REQUEST BODY</h3>

                        <div>
                            {iterateObjectTable(data,postFields,setPostFields)}
                        </div>
                        
                    </div> : <></>}

                    { putUrl ?
                    <div className='response-container' >
                      {requiredParameters(data,putUrl,'',postFields,'put')}
                    </div> : <></>}

                    { deleteUrl ?
                    <div className='response-container' >
                      {requiredParameters(data,deleteUrl,'',postFields,'delete')}
                    </div> : <></>}
                </div>
            </section>
          </section>
        </section>
    )
}

export default DocumentationTemplate