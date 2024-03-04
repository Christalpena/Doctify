import { requiredParameters } from "../documentation/data";

const ReadMe = (props:any) => {
    const {data,getUrl,postUrl,deleteUrl,putUrl,fields} = props

    const [putParameter,putParameterRequired,deleteParameter,deleteParameterRequired] = requiredParameters(fields,putUrl,deleteUrl)
    console.log(putUrl)

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
  

    return(
        <section>
            <h1> # DOCUMENTACION DE API </h1> 
            
            <h3>### URL Base</h3> 
            <p>{getUrl}</p> 
            <h3>### EndPoints</h3>
            <h4>#### GET </h4>
            <p>##### GetUrl: {getUrl}</p> <br />

            <div>
              | Campo | Tipo | Requerido | <br/>
              | :--- | :---: | ---: |
              {recorrer(data,fields,'get')} 
            </div>
            {postUrl ? 
            
              <div>
              <h4>#### POST</h4>
              <p>##### PostUrl: {postUrl}</p> <br />

              | Campo | Tipo | Data | <br/>
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

        </section>
    );
}


export default ReadMe