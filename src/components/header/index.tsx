import "./header.css"

const Header = () => {

    return(
        <header>
            <nav>
                <ul>
                    <li className="header-logo">
                        <img src="Doctify.png" alt="" />
                        <h1>DOCTIFY</h1>
                    </li>
                    <li className="githubLink"><a href="https://github.com/Christalpena/Doctify.git">Github</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header