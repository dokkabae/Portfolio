import Header from "./Header";
import { Outlet } from "react-router-dom";

/* Basic layout wrapper */
export default function Layout() {
  return (
    <>
      <Header />
      <div className="app-shell">
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
