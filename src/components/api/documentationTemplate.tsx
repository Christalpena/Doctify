import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';


const DocumentationTemplate = (props:any) => {
    const {data,getUrl,postUrl,deleteUrl,putUrl} = props
    const [campos,setCampos] = useState({})
    
    const guardarCampos = (objeto:any) => {
      const newCampos:any = {};
      
      const obtenerCampos = (objeto:any) => {
        Object.keys(objeto).forEach((key) => {
          if (typeof objeto[key] === 'object' && objeto[key] !== null) {
            obtenerCampos(objeto[key]);
          } else {
            newCampos[key] = true;
          }
        });
      };
      
      obtenerCampos(objeto);
      setCampos(newCampos);
    };
  

    const setRequerido = (campo: string, valor: boolean) => {
      setCampos(prevState => ({ ...prevState, [campo]: valor }));
    };

    useEffect(() => {
      guardarCampos(data)
    },[data])


    function recorrerObjeto(objeto: any,section:any,campos:any) {
        putParameterRequired = campos[putParameter]
        deleteParameterRequired = campos[deleteParameter]
        return (
          <ul>
            {Object.keys(objeto).map((key, index) => {
              if (typeof objeto[key] === 'object' && objeto[key] !== null) {
                return (
                  <li key={index}>
                    <strong>{key} : </strong> 
                    <span>&#123;</span>
                    {recorrerObjeto(objeto[key],section,campos)}
                    <span>&#125;</span>
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    {!section ?
                    <li>
                      <strong>"{key}" : <span>&#123;</span></strong> 
                      <ul>
                        <li>"type" : "{typeof objeto[key]}",</li>
                        <li>
                        <FormControlLabel control={<Checkbox defaultChecked={true} onChange={(e) => setRequerido(key, e.target.checked)} />} label="`requerido :" />
                        </li>
                      </ul> 
                      <span>&#125; ,</span>
                    </li>
                    : 
                      <li><strong>"{key}" : {typeof objeto[key] === 'number' ? objeto[key] : `"${objeto[key]}"` }</strong></li>
                    }
                  </li> 
                );
              
              }
            })}
          </ul>
        );
    }

    let putParameterRequired = true
    let deleteParameterRequired = true
    function recorrerObjetoTabla(objeto: any,campos:any) {
      return Object.keys(objeto).map((key:any, index:any) => {
              if (typeof objeto[key] === 'object' && objeto[key] !== null){
                return recorrerObjetoTabla(objeto[key],campos);
              } else{
                return(
                <tr key={index} >
                  <th>{key}</th>
                  <th>{typeof objeto[key]}</th>
                  <th>{campos[key] === true ? 'Si' : 'No'}</th>
                </tr>
                )
              }
            }
        );
    }
    
    
    const putParameter:string = putUrl ? putUrl.slice(putUrl.lastIndexOf('/')+1 + 1) : ''
    const deleteParameter:string = deleteUrl ? deleteUrl.slice(deleteUrl.lastIndexOf('/')+1 + 1) : ''

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
                      recorrerObjeto(data,'',campos)
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
                            recorrerObjeto(data,'get',campos)
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
                            {recorrerObjetoTabla(data,campos)}
                            </tbody>
                          </table>

                        </div>
                    </div> : <></>}

                    { putUrl ?
                    <div >
                        <h2>PUT</h2>
                        <strong>URL: </strong><span>{postUrl}</span>
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
                    <div >
                        <h2>DELETE</h2>
                        <strong>URL: </strong><span>{postUrl}</span>
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
        </section>
    )
}

export default DocumentationTemplate