import Header from "./Header";
import Profile from "./Profile";
import { Outlet } from "react-router-dom";

/* Basic layout wrapper */
export default function Layout() {
  return (
    <>
      <Header />
      <div className="app-shell">
        <Profile />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
