import React, { useContext, useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import "./nav.css";
import logo from "../assets/logo.png";

const Nav = () => {
    
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
        console.log(user);
    },[user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navBar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={`hoda ${isOpen ? "open" : ""}`}>
        <Link to="/" className="navLink">Home</Link>
        {user && (<Link to="/recipes" className="navLink" onClick={()=>setIsOpen(!isOpen)}>My Recipes</Link>)}
        {user && <Link to="/add" className="navLink" onClick={()=>setIsOpen(!isOpen)} >Add Recipe</Link>}
      </div>

      <div className={`loginSignup ${isOpen ? "open" : ""}`}>
        {user ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button style={{ backgroundColor: "white" }}>Log In</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;