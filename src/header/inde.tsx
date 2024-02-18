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
                    <li>Documentation</li>
                    <li>Get started</li>
                    <li>Github</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header