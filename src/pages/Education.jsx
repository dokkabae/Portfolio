import "../styles/Education.css";

export default function Education() {
  return (
    <div className="home">
      <section className="education-layout">
        <div className="education-card">
          <h1 className="headings">Key achievements</h1>
          <ul className="key_achievements">
            <li>70% Average for third year computer science modules</li>
            <li>82% Final NSC average</li>
            <li>Placed third academically in matric</li>
            <li>Highest final CAT mark in matric</li>
            <li>RCL member in matric</li>
          </ul>
        </div>

        <div className="education-card">
          <h1 className="headings">High school</h1>
          <h3 className="headings">Matric</h3>

          <ul className="education_list">
            <li>Math - 78</li>
            <li>Biology - 85</li>
            <li>Science - 84</li>
            <li>Afrikaans - 76</li>
            <li>English - 84</li>
            <li>CAT - 86</li>
            <li>LO - 80</li>
          </ul>
        </div>

        <div className="education-card">
          <h1 className="headings">University</h1>
          <h3 className="headings">First year</h3>

          <ul className="education_list">
            <li>Math 114 - 58 (Intro to Calculus)</li>
            <li>Applied Math 114 - 60 (Intro to Applied Mathematics)</li>
            <li>Probability Theory and Statistics 114 - 51 (Probability Theory)</li>
            <li>Computer Science 114 - 62 (Intro to Programming)</li>
            <li>Science in Context 178 - 72 (Research Theory)</li>
            <li>Data Science 114 - 56 (Data Analytics)</li>
            <li>Operations Research 114 - 57 (Logistics Optimization Algorithms)</li>
            <li>Math 144 - 56 (Calculus I)</li>
            <li>Applied Math 144 - 50 (Linear Algebra I)</li>
            <li>Computer Science 144 - 60 (Object Oriented Programming)</li>
            <li>Operations Research 144 - 54 (Intro to Linear Programming)</li>
          </ul>

          <h3 className="headings">Second year</h3>

          <ul className="education_list">
            <li>Math 214 - 58 (Linear Algebra II and Calculus II)</li>
            <li>Applied Math 214 - 67 (Differential Equations)</li>
            <li>Operations Research 214 - 58 (Linear Programming)</li>
            <li>Computer Science 214 - 62 (Data Structures and Algorithms)</li>
            <li>Math 244 - 50 (Linear Algebra III and Calculus III)</li>
            <li>Computer Science 244 - 62 (Low Level Computer Architecture)</li>
          </ul>

          <h3 className="headings">Third year</h3>

          <ul className="education_list">
            <li>Computer science 314 - 60 (Concurrent Programming)</li>
            <li>Computer science 313 - 71 (Advanced Computer Networks)</li>
            <li>Operations Research 314 - 57 (Dynamic Programming) </li>
            <li>Operations Research 322 - 50 (Queueing Theory & Simulation Modelling)</li>
            <li>Computer science 343 - 81 (Website Development)</li>
            <li>Computer science 344 - 68 (Software Engineering)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
