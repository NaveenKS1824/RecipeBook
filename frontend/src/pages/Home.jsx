import React, { useEffect, useState } from "react";
import "./home.css";
import card1 from "../assets/item1.jpg";
import card2 from "../assets/item2.jpg";
import card3 from "../assets/item3.jpg";
import Gallery from "../component/Gallery";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const res = await axios.get("https://recipebook-aosa.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Unauthorized or error fetching user:", err.response?.data?.message || err.message);
        // navigate("/login");
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-left">
          <button className="tagline-btn">
            <span>Know before you go</span>
          </button>
          <h2>
            We are the reason to <span className="highlight">your Happiness</span>
          </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
            provident dignissimos reiciendis nam, qui dolor vitae suscipit aut,
            nulla doloremque est magni? Laboriosam, earum. Quia adipisci
            repudiandae minima sequi quidem.
          </p>
        </div>
        <div className="home-right">
          <img src={card1} alt="" className="recipeimg" />
          <div className="card2">
            <img src={card2} alt="" className="recipeimg" />
          </div>
          <div className="card3">
            <img src={card3} alt="" className="recipeimg" />
          </div>
        </div>
      </div>
      <Gallery />
    </>
  );
};

export default Home;
