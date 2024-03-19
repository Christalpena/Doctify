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
                    <a target='_blank' href="https://github.com/Christalpena/Doctify.git"><li className="githubLink">Github</li></a>
                </ul>
            </nav>
        </header>
    )
}

export default Header