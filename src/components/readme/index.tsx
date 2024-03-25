import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { dataBody, requiredParameters } from '../documentation/data';

const ReadMe = (props:any) => {
  const {data,getUrl,postUrl,deleteUrl,putUrl,postFields,getFields} = props

  const notify = () => toast("Copiado al clickBoard!");

  const recorrer = (data: any, fields: any) => {
    return Object.keys(fields).map((key: any) => {
        return (
            <div key={key}>
                | {key} | {typeof data[key]} | {fields[key] === true ? 'Si' : 'No'} |
            </div>
        );
    });
  };

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
          <p className='urls'>{getUrl}</p> 
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
          <section>
            <h4>### CAMPOS</h4>
            <div id="readme-content">
            | Campos | Tipo | Requerido | <br/>
            | :--- | :---: | ---: |
            {recorrer(data,getFields)} 
          </div>
          </section>

          <section>
            <h3 className='get'>## GET </h3>
            <p className='urls'>##### Url GET: {getUrl}</p>

            <div>
              {dataBody('readme',data,getFields)}
            </div>
          </section>

          {postUrl ? 
            <section>
              <div>
              <h3 className='post'>## POST</h3>
              <p className='urls'>##### Url Post: {postUrl}</p>
              <h4>### Request Body</h4>

              | Campos | Tipo | Requerido | <br/>
              | :--- | :---: | ---: |
              {recorrer(data,postFields)} 
              </div> 
            </section> : <></>
          }

          {putUrl ?
            <section>
              {requiredParameters(data,putUrl,'readme',postFields,'put') }
            </section> : <></>
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