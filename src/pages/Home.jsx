import "../styles/Home.css";
import { useEffect, useState } from "react";
import { useCursorPosition } from "../components/useCursorPosition";
import bzzzLogo from "../resources/bzzz.svg";
import { motion } from "framer-motion";

export default function Home() {

  const cursorPos = useCursorPosition();
  const [zoom, setZoom] = useState(1);

  useEffect(() => {

    const updateZoom = () => {

      const bodyZoom = Number(getComputedStyle(document.body).zoom);
      setZoom(Number.isFinite(bodyZoom) && bodyZoom > 0 ? bodyZoom : 1);
    };

    updateZoom();
    window.addEventListener("resize", updateZoom);
    return () => window.removeEventListener("resize", updateZoom);

  }, []);


  return (

    <div className="home">
      <motion.img
        id="cursor"
        src={bzzzLogo}
        alt="Bzzz cursor"
        animate={{ x: (cursorPos.x + 30) / zoom, y: (cursorPos.y + 30) / zoom }}
      />

      <section className="edit-card">
        <div className="greeting">

          <h1 id = "heading">Hi, welcome to my portfolio</h1>
    
          <div id = "body">
            My name is Ian du Toit<br></br><br></br>
            I'm a final year computer science student<br></br><br></br>
            Feel free to have a look around and e-mail me<br></br><br></br>
            at ian@dutoit.ws for any inquiries<br></br><br></br>
          </div>

        </div>
      </section>
    </div>
  );
}
