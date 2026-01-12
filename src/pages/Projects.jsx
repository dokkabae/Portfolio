import "../styles/Projects.css";

export default function Projects() {
  return (
    <div className="home">
      <section className="projects-layout">
        <div className="projects-card">
          <h1 className="headings">Languages</h1>
          <ul className="education_list">
            <li>.NET framework</li>
            <li>C</li>
            <li>C#</li>
            <li>SQL</li>
            <li>PostgreSQL</li>
            <li>x86 Assembly</li>
            <li>Java</li>
            <li>JavaScript</li>
            <li>JavaFX</li>
            <li>React</li>
            <li>Express</li>
            <li>Python</li>
            <li>R</li>
            <li>MATLAB</li>
            <li>Excel</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>

        <div className="projects-card">
          <h1 className="headings">Projects</h1>
          <ul className="education_list">
            <li>Cross-platform Campus Carpool App (.NET MAUI)</li>
            <li>Compiler for an LL(1) programming language (C)</li>
            <li>Process scheduler parallelized with OpenMP (C)</li>
            <li>Othello board game player bot parallelized with MPI (C)</li>
            <li>Multi-Client Chat Application (Java, JavaFX)</li>
            <li>VoIP (Voice over Internet Protocol) Chatroom (Java, JavaFX)</li>
            <li>Reliable Blast User Datagram Protocol (RBUDP) File Transfer Application (Java, JavaFX)</li>
            <li>Peer-to-Peer (P2P) file sharing program (Java, JavaFX)</li>
            <li>Trivia Tournament Web Application (React, Express, PostgreSQL, Python)</li>
            <li>Text-to-Braille translator (Java)</li>
            <li>Personal website (React, JavaScript, NodeJS)</li>
            <li>Obstacle Chess Game (Python)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
