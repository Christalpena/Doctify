import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function iterateObjectTable(data: any,fields:any) {
  return Object.keys(data).map((key:any, index:any) => {
          if (typeof data[key] === 'object' && data[key] !== null){
            return iterateObjectTable(data[key],fields);
          } else{
            return(
            <tr key={index} >
              <th>{key}</th>
              <th>{typeof data[key]}</th>
              <th>{fields[key] === true ? 'Si' : 'No'}</th>
            </tr>
            )
          }
        }
    );
}

const setRequired = (field: string, valor: boolean,setfields: any) => {
    setfields((prevState: any) => ({ ...prevState, [field]: valor }));
};



export function iterateObject(data: any,section:string,campos:any,setCampos:any) {

    return (
      <ul>
        {Object.keys(data).map((key, index) => {
          if (typeof data[key] === 'object' && data[key] !== null) {
            return (
              <li key={index}>
                <strong>{key} : </strong> 
                <span>&#123;</span>
                {iterateObject(data[key],section,campos,setCampos)}
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
                    <li>"type" : "{typeof data[key]}",</li>
                    <li>
                    <FormControlLabel control={<Checkbox defaultChecked={true} onChange={(e) => setRequired(key, e.target.checked,setCampos)} />} label="`requerido :" />
                    </li>
                  </ul> 
                  <span>&#125; ,</span>
                </li>
                : 
                  <li><strong>"{key}" : {typeof data[key] === 'number' ? data[key] : `"${data[key]}"` }</strong></li>
                }
              </li> 
            );
          
          }
        })}
      </ul>
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