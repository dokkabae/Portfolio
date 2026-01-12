import { Link } from "react-router-dom";
import Bzzz from "../resources/bzzz.png";
import "../styles/Header.css";


function Header(){

    return(

        /* Very basic navigation header */
        <header className = "header">
            <nav>
                    <div id = "nav_div">
                        
                    <Link id = "Home" to="/">Home</Link>

                    <Link id = "Education" to="/education">Education</Link>

                    <Link id = "Experience" to="/experience">Experience</Link>

                    <Link id = "Blog" to="/blog">Blog</Link>
                    <a>

                        <img src={Bzzz} alt="Bzzz" id="logo" />

                    </a>

                    </div>
            </nav>
        </header>

    );
}

export default Header
