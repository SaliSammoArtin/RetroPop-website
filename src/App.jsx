import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {" "}
      {}
      <div id="page-content" className="flex-1">
        <header>
          <NavBar />
        </header>
        {}
        <Outlet />
      </div>
      {}
      <Footer />
    </div>
  );
}
