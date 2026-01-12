import { Link } from "react-router-dom";
import Bzzz from "../resources/bzzz.png";
import "../styles/Header.css";


function Header(){

    return(

        /* Very basic navigation header */
        <header className = "header">
            <nav>
                    <div id = "nav_div">
                        
                    <Link className="nav-link" id="Home" to="/">Home</Link>

                    <Link className="nav-link" id="Education" to="/education">Education</Link>

                    <Link className="nav-link" id="Experience" to="/experience">Experience</Link>

                    <Link className="nav-link" id="Blog" to="/projects">Projects</Link>
                    <a>

                        <img src={Bzzz} alt="Bzzz" id="logo" />

                    </a>

                    </div>
            </nav>
        </header>

    );
}

export default Header
