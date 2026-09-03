import { Outlet } from "react-router";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

export default function App() {

  return (
    <> {

    }
      <div id="page-content">
        <header>
        <NavBar />
        </header>
        {

        }
        <Outlet/>
        
      </div> 
      
      {

      }
      <Footer/>
    </>
  )
}

