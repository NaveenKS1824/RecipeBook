import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import "./nav.css";
import logo from "../assets/logo.png";

const Nav = () => {
    useEffect(()=>{
        console.log(user);
    },[]);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

      <div className="hoda">
        <Link to="/" className="navLink">Home</Link>
        {user && (<Link to="/recipes" className="navLink">My Recipes</Link>)}
        {user && <Link to="/add" className="navLink">Add Recipe</Link>}
      </div>

      <div className="loginSignup">
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