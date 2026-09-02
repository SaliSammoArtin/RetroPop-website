import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
function App() {
  

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

export default App
