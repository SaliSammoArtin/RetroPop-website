import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  //en async funktion som fetchar 

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

