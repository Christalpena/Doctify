import { useState } from "react"
import "./elements.css"

const Input = (props:any) => {
    const [apiUrl,setApiUrl] = useState('')

    const driveInputChange = (e:any) => {
        setApiUrl(e.target.value)
        props.url(e.target.value)
    }
    return(
        <div className="url-inputs">
        <h3>{props.id}</h3>
        <input title="This is the text of the tooltip" type={props.type} name="" id={props.id} value={apiUrl} onChange={(e) => driveInputChange(e)} required={props.required} placeholder={`${props.id} URL`}/>
        </div>
    )
}

export default Input