import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { requiredParameters } from '../documentation/data';

const ReadMe = (props:any) => {
    const {data,getUrl,postUrl,deleteUrl,putUrl,postFields,getFields} = props

    const notify = () => toast("Copiado al clickBoard!");

    const recorrer = (data: any, getFields: any, endPoint: string): JSX.Element => {
      return ( 
        <>
        {endPoint ?
        Object.keys(data).map((key:any, index:any) => {
          return(
            <div key={index}>
            | {key} | {typeof data[key]} | {data[key]} |
            </div>
          )
        })
        :
        Object.keys(getFields).map((key:any) => {
          return(
            <div key={key}>
            | {key} | {typeof data[key]} | {getFields[key] === true ? 'Si' : 'No'} |
            </div>
          )
        })
        }
        </>
    );
   }
   const handleCopyButtonClick = () => {
    const readmeContent = document.getElementById('readme-content');
    if (readmeContent) {
        const range = document.createRange();
        range.selectNode(readmeContent);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
        document.execCommand('copy');
        window.getSelection()?.removeAllRanges();
        notify()
    }
}  
  
    return(
        <section>
          <button className="btn" onClick={handleCopyButtonClick}>Copiar</button>
          <div id="readme-content" >
            <h1> # DOCUMENTACION DE API </h1> 
            
            <h3>## URL Base</h3> 
            <p>{getUrl}</p> 
            <h3>## EndPoints</h3>
              { getUrl ? 
                  <p>- **GET**</p>
              : <></> 
              }
              { postUrl ? 
                  <p>- **POST**</p>
              : <></> 
              }
              { deleteUrl ? 
                  <p>- **DELETE**</p>
              : <></> 
              }
              {  putUrl ? 
                  <p>- **PUT**</p>
              : <></> 
              }
            <h4 className='get'>### GET </h4>
            <p>##### GetUrl: {getUrl}</p> <br />

            <div id="readme-content">
              | Campo | Tipo | Data | <br/>
              | :--- | :---: | ---: |
              {recorrer(data,getFields,'get')} 
            </div>

            {postUrl ? 
            
              <div>
              <h3 className='post'>## POST</h3>
              <p>##### PostUrl: {postUrl}</p>
              <h4>### Request Body</h4>

              | Campo | Tipo | Requerido | <br/>
              | :--- | :---: | ---: |
              {recorrer(data,postFields,'')} 
              </div> : <></>
            }

            {putUrl ?
              requiredParameters(data,putUrl,'readme',postFields,'put') : <></>
            }


            {deleteUrl ?
            requiredParameters(data,deleteUrl,'readme',postFields,'delete') : <></>
            }

        </div>
        <ToastContainer />    
        </section>
    );
}


export default ReadMe