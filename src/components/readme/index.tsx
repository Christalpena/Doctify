import { requiredParameters } from "../documentation/data";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ReadMe = (props:any) => {
    const {data,getUrl,postUrl,deleteUrl,putUrl,fields} = props

    const [putParameter,putParameterRequired,deleteParameter,deleteParameterRequired] = requiredParameters(fields,putUrl,deleteUrl)
    console.log(putUrl)

    const notify = () => toast("Copiado al clickBoard!");


    const recorrer = (data: any, fields: any, endPoint: string): JSX.Element => {
      return ( 
        <>
        {Object.keys(data).map((key:any, index:any) => {
          if (typeof data[key] === 'object' && data[key] !== null){
            return recorrer(data[key], fields, endPoint);
          } else{
            return(
            <>
            {endPoint ?
              <div key={index}>
              | {key} | {typeof data[key]} | {data[key]} |
              </div>
            :
            <div key={index}>
              | {key} | {typeof data[key]} | {fields[key] === true ? 'Si' : 'No'} |
            </div>
            } </>
            )
          }
        })}
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
            
            <h3>### URL Base</h3> 
            <p>{getUrl}</p> 
            <h3>### EndPoints</h3>
            <h4>#### GET </h4>
            <p>##### GetUrl: {getUrl}</p> <br />

            <div id="readme-content">
              | Campo | Tipo | Data | <br/>
              | :--- | :---: | ---: |
              {recorrer(data,fields,'get')} 
            </div>
            {postUrl ? 
            
              <div>
              <h4>#### POST</h4>
              <p>##### PostUrl: {postUrl}</p> <br />

              | Campo | Tipo | Requerido | <br/>
              | :--- | :---: | ---: |
              {recorrer(data,fields,'')} 
              </div> : <></>
            }

            {putUrl ?
            <div>
              <h3>#### PUT</h3>
              <p>##### Url: {putUrl}</p> <br />

              | Campos | Tipo | Requerido | <br />
              | :--- | :---: | ---: | <br/>
              | {putParameter} | {typeof data[putParameter]} | {putParameterRequired ? 'Si' : 'No'} |
            </div> : <></>

            }


            {deleteUrl ?
            <div>
              <h3>#### Delete</h3>
              <p>##### Url: {deleteUrl}</p> <br />

              | Campos | Tipo | Requerido | <br />
              | :--- | :---: | ---: | <br/>
              | {deleteParameter} | {typeof data[deleteParameter]} | {deleteParameterRequired ? 'Si' : 'No'} |
            </div> : <></>

            }

        </div>
        <ToastContainer />    
        </section>
    );
}


export default ReadMe