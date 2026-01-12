import Header from "./Header";
import { Outlet } from "react-router-dom";

/* Basic layout wrapper */
export default function Layout() {
  return (
    <>
      <video
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source
          src={`${import.meta.env.BASE_URL}backgrounds/portfolio_background.mp4`}
          type="video/mp4"
        />
      </video>
      <Header />
      <div className="app-shell">
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
