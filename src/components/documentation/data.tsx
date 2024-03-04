import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function iterateObjectTable(data: any,fields:any): JSX.Element {
  return (
    <>
    {Object.keys(data).map((key:any, index:any) => {
      if (typeof data[key] === 'object' && data[key] !== null){
        return iterateObjectTable(data[key],fields);
      } else{
        return(
        <tr key={index} >
          <td>{key}</td>
          <td>{typeof data[key]}</td>
          <td>{fields[key] === true ? 'Si' : 'No'}</td>
        </tr>
        )
      }})}
    </>);
}

const setRequired = (field: string, valor: boolean,setfields: any) => {
    setfields((prevState: any) => ({ ...prevState, [field]: valor }));
};



export function iterateObject(data: any,section:string,campos:any,setCampos:any) {

    return (
      <li>
        {Object.keys(data).map((key, index) => {
          if (typeof data[key] === 'object' && data[key] !== null) {
            return (
              <ul key={index}>
                <li>{key} : </li> 
                <li>&#123;</li>
                {iterateObject(data[key],section,campos,setCampos)}
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
                    <FormControlLabel control={<Checkbox defaultChecked={true} onChange={(e) => setRequired(key, e.target.checked,setCampos)} />} label=<strong>"Requerido" :</strong> />
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