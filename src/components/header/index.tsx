import "./header.css"
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const nav = (route:string) => {
        navigate(`/${route}`)
    }
    return(
        <header>
            <nav>
                <ul>
                    <li className="header-logo">
                        <img src="Doctify.png" alt="" />
                        <h1>DOCTIFY</h1>
                    </li>
                    <li className="githubLink">Github</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header