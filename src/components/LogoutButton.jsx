import { useAuth } from "../auth/AuthContext";
import "../styles/Auth.css";

export default function LogoutButton() {

  const { isLoggedIn, logout } = useAuth();

  /* Make the logout button appear if we are logged out */
  if (!isLoggedIn) return null;

  /* Make the logout button appear if we are logged in */
  return (

    <button className="logout-btn" type="button" onClick={logout}>
      Logout
    </button>
  );
}
