import ProfileImg from "../resources/profile.jpg";
import "../styles/Profile.css";

function readList(key, fallback) {

  /* Read the data from browser local storage */
  try {

    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : null;

    return Array.isArray(arr) ? arr : fallback;
  
  } catch {
    return fallback;
  }
}

function readString(key, fallback) {

  try {
  
    const raw = localStorage.getItem(key);

    /* Trim whitespace and return key */
    return raw && raw.trim() ? raw : fallback;

  } catch {

    return fallback;
  }
}

export default function Profile() {

  /* Default values */
  const name = readString("name", "Ian du Toit");
  const photo = readString("photo", ProfileImg);

  const interests = readList("interests", [
    "Photography", "Reading", "Coding", "Camping", "Gaming"
  ]);

  const plans = readList("plans", [
    "Become a software developer", "Move to South America",
    "Start making music", "Grow a beard", "Learn Mandarin"
  ]);

  return (

    /* Render the side bar */
    <aside className="profile">
  
      <img
        src={photo}
        className="profile-photo"
      />

      <h2 className="profile-name">{name}</h2>

      <h3>Interests</h3>

      <ul>

        {/* Loop through interests and creates list items from them */}
        {interests.map((x, i) => <li key={i}>{x}</li>)}

      </ul>

      <h3>Plans</h3>

      <ul>

        {/* Loop through plans and creates list items from them */}
        {plans.map((x, i) => <li key={i}>{x}</li>)}

      </ul>
    
    </aside>
  );
}
