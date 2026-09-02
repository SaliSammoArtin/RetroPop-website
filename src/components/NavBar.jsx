import { Link } from "react-router";

export default function NavBar() {
  return <div className="sticky top-0 z-50 bg-black"> 
    <Link to="/">Homepage</Link>
        <Link to="/products">Products</Link>
        <Link to="/products">Categories</Link>
    </div>
}