import { useState } from "react"


const Input = (props:any) => {
    const [apiUrl,setApiUrl] = useState('')

    const driveInputChange = (e:any) => {
        setApiUrl(e.target.value)
        props.url(e.target.value)
    }
    return(
        <div>
        <h3>{props.id}</h3>
            <input type="text" name="" id={props.id} value={apiUrl} onChange={(e) => driveInputChange(e)} />
        </div>
    )
}

export default Input