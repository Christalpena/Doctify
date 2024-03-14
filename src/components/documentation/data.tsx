import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export function iterateObjectTable(data: any, postFields: any, setPostFields: any): JSX.Element {

  const handleDeleteField = (key: any) => {
    const newFields = { ...postFields };
    delete newFields[key];
    setPostFields(newFields);
  };

  return (
    <>
    {Object.keys(postFields).map((key: any,index:number) => {
        return(
          <tr key={index} id={key}>
            <td>{key}</td>
            <td>{typeof data[key]}</td>
            <td>{postFields[key] === true ? 'Si' : 'No'}</td>
            <td>
              <Tooltip title="Eliminar" onClick={() => handleDeleteField(key)}>
                <IconButton>
                  <RemoveCircleOutlineRoundedIcon />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
          )
    })}
    </>);
}

export function iterateObject(data: any,section:string,getFields:any,setRequiredGetFields:any) {

    return (
      <li>
        {Object.keys(data).map((key) => {
          if (typeof data[key] === 'object' && data[key] !== null) {
            return (
              <ul key={key}>
                <li>{key} : </li> 
                <li>&#123;</li>
                {iterateObject(data[key],section,getFields,setRequiredGetFields)}
                <li>&#125;</li>
              </ul>
            );
          } else {
            return (
                <ul key={key} className='p'>
                {!section ?
                  <>
                    <li><strong>"{key}" :</strong> <span>&#123;</span></li> 
                    <li className='fields'><strong>"type" :</strong> "{typeof data[key]}",</li>
                    <li className='fields'>
                    <FormControlLabel control={
                    <Checkbox 
                    id={`checkbox-${key}`}
                    checked={!!getFields[key]}
                    onChange={(e) => setRequiredGetFields(key, e.target.checked)} />} label=<strong>"Requerido" :</strong> 
                    />
                    </li>
                    <li>&#125; ,</li>

                  </> 
                : 
                  <li key={key}><strong>"{key}" : </strong> {typeof data[key] === 'number' ? data[key] : `"${data[key]}"` }</li> }
                </ul>
                
            );
          
          }
        })}
      </li>
    );
}

export function requiredParameters(data:any,url:string,section:any,postFields:any,endPoint?:any){

  const parameter:string = url.slice(url.lastIndexOf('/')+1 + 1);
  const requestBody = Object.keys(postFields).filter((key:any) => key !== parameter)
  console.log(requestBody)
  
  return(
    !section ?
    <div>
      <hr />
      <h2 className={endPoint}>{endPoint}</h2>
      <strong>URL: </strong><span>{url}</span>
      <table>
        <tbody>
          <tr>
            <th>Campo</th>
            <th>Tipo</th>
          </tr>
          <tr>
            <th>{parameter}</th>
            <th>{typeof data[parameter]}</th>
          </tr> 
        </tbody>
      </table>
      { endPoint === 'put' ? 
      <div>
      <h3>REQUEST BODY</h3>
        <div className='response-list'>
          <span>&#123;</span>
          <ul>
          {Object.keys(requestBody).map((key:any) => {
            return(
              <li key={key}>{requestBody[key]}: {data[requestBody[key]]}</li> 
            )
          })}
          </ul>
          <span>&#125;</span>
        </div>
      </div>
      : <></>
    
      }
    </div>
    : 
    <div>
      <h3>#### {endPoint}</h3>
      <p>##### Url: {url}</p> <br />

      | Campos | Tipo | <br />
      | :--- | :---: | ---: | <br/>
      | {parameter}| {typeof data[parameter]} | <br/>
    </div> 
  )
}