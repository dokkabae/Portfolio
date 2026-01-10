import { Link } from "react-router-dom";
import InstaLogo from "../resources/insta.jpg";
import RickRoll from "../resources/rickroll.jpg";
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

                    <a href="https://www.instagram.com/ian_dtoit"               target="_blank" rel="noopener noreferrer">

                        <img src={InstaLogo} alt="Instagram" id="insta_logo" />

                    </a>

                    <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran" target="_blank" rel="noopener noreferrer">

                        <img src={RickRoll} alt="Instagram" id="rick_roll" />

                    </a>

                    <a>

                        <img src={Bzzz} alt="Bzzz" id="logo" />

                    </a>

                    </div>
            </nav>
        </header>

    );
}

export default Header