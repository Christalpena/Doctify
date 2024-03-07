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
            <input type={props.type} name="" id={props.id} value={apiUrl} onChange={(e) => driveInputChange(e)} required={props.required} placeholder={`${props.id} URL`}/>
        </div>
    )
}

export default Input