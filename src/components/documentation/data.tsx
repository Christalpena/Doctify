import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export function iterateObjectTable(data: any,fields:any,setFields:any): JSX.Element {
  console.log(fields)

  return (
    <>
    {Object.keys(data).map((key:any, index:any) => {
      if (typeof data[key] === 'object' && data[key] !== null){
        return iterateObjectTable(data[key],fields,setFields);
      } else{
        return(
        <tr key={index} >
          <td>{key}</td>
          <td>{typeof data[key]}</td>
          <td>{fields[key] === true ? 'Si' : 'No'}</td>
          <td>
            <Tooltip title="Eliminar">
                <IconButton>
                  <RemoveCircleOutlineRoundedIcon />
                </IconButton>
            </Tooltip>
            </td>
        </tr>
        )
      }})}
    </>);
}


export function iterateObject(data: any,section:string,fields:any,setFields:any,setRequired:any) {

    return (
      <li>
        {Object.keys(data).map((key, index) => {
          if (typeof data[key] === 'object' && data[key] !== null) {
            return (
              <ul key={index}>
                <li>{key} : </li> 
                <li>&#123;</li>
                {iterateObject(data[key],section,fields,setFields,setRequired)}
                <li>&#125;</li>
              </ul>
            );
          } else {
            return (
                <ul key={index} className='p'>
                {!section ?

                  <>
                    <li><strong>"{key}" :</strong> <span>&#123;</span></li> 
                    <li className='fields'><strong>"type" :</strong> "{typeof data[key]}",</li>
                    <li className='fields'>
                    <FormControlLabel control={<Checkbox checked={!!fields[key]} onChange={(e) => setRequired(key, e.target.checked)} />} label=<strong>"Requerido" :</strong> />
                    </li>
                    <li>&#125; ,</li>

                  </> 
                : 
                  <li key={index}><strong>"{key}" : </strong> {typeof data[key] === 'number' ? data[key] : `"${data[key]}"` }</li> }
                </ul>
                

            );
          
          }
        })}
      </li>
    );
}


export function saveFields(data:any) {
    const newFields:any = {};
    
    const getFields = (data:any) => {
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
          getFields(data[key]);
        } else {
          newFields[key] = true;
        }
      });
    };
    
    getFields(data);
    return newFields
};

export function requiredParameters(field:any,putUrl:string,deleteUrl:string){

    const putParameter:string = putUrl ? putUrl.slice(putUrl.lastIndexOf('/')+1 + 1) : ''
    const deleteParameter:string = deleteUrl ? deleteUrl.slice(deleteUrl.lastIndexOf('/')+1 + 1) : ''
    
    const putParameterRequired = field[putParameter]
    const deleteParameterRequired = field[deleteParameter]

    return [putParameter,putParameterRequired,deleteParameter,deleteParameterRequired]

}