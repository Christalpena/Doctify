import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function iterateObjectTable(data: any, postFields: any, setPostFields: any): JSX.Element {

  const handleDeleteField = (key: any) => {
    const newFields = { ...postFields };
    delete newFields[key];
    setPostFields(newFields);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Campo</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(postFields).map((key) => (
            <TableRow
              key={key}
            >
              <TableCell align="center" component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="center">{typeof data[key]}</TableCell>
              <TableCell align="center">{typeof data[key] === 'boolean' ? 'true' : data[key]}</TableCell>
              <TableCell align="center">
                <Tooltip title="Eliminar" onClick={() => handleDeleteField(key)}>
                  <IconButton>
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
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

export function dataBody(section:string,data:any,body:any){
  return (
      <div>
          {section ? <h4>### Body</h4> : <h4>BODY</h4> }
          <div className='response-list'>
              {section ? <p>```</p> : <></>}
              <span>&#123;</span>
              <ul>
                  {Object.keys(body).map((key: any) => (
                      <li key={key}>
                          <strong>"{key}" : </strong>
                          {typeof data[key] === 'boolean' ? 'true' : typeof data[key] === 'number' ? data[key] : `"${data[key]}"`
                          }
                      </li>
                  ))}
              </ul>
              <span>&#125;</span>
              {section ? <p>```</p> : <></>}
          </div>
      </div>
  );
};

export function requiredParameters(data: any, url: string, section: string, postFields: any, endPoint?: any) {
  const parameter: string = url.slice(url.lastIndexOf('/') + 1 + 1);

  return (
      <div>
          {!section ?
              <>
                  <hr />
                  <h2 className={endPoint}>{endPoint}</h2>
                  <p className='urls'><strong>URL: </strong>{url}</p>


                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Parametro</TableCell>
                          <TableCell align="center">Tipo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <TableRow>
                            <TableCell align="center">{parameter}</TableCell>
                            <TableCell align="center">{typeof data[parameter]}</TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {endPoint === 'put' ? 
                  dataBody(section,data,postFields) : 
                  <></>}
              </>
              :
              <>
                  <h3 className={endPoint}>## {endPoint}</h3>
                  <p>##### Url {endPoint}: {url}</p> <br />

                  | Parametro | Tipo | <br />
                  | :--- | :---: | <br />
                  | {parameter} | {typeof data[parameter]} | <br />
                  
                  {endPoint === 'put' ? 
                  dataBody(section,data,postFields) : 
                  <></>}
              </>
          }
      </div>
  );
}
