import "../styles/Home.css";
import Profile from "../resources/profile.jpg";

export default function Home() {

  return (

    <div className="home">

      <img src={Profile} alt="Me" id="profile_photo"/>
      <p id="name">Ian du Toit</p>

      <p id="interests" className="headers">Interests</p>
      <p id="plans" className="headers">Plans</p>

      <ul id = "interests_list" className="lists">
        <li>Photography</li>
        <li>Reading</li>
        <li>Coding</li>
        <li>Motorcross</li>
        <li>Gaming</li>
      </ul>

      <ul id = "plans_list" className="lists">
        <li>Become a software developer</li>
        <li>Move to South America</li>
        <li>Start making music</li>
        <li>Grow a beard</li>
        <li>Learn German</li>
      </ul>

    </div>
  );
}