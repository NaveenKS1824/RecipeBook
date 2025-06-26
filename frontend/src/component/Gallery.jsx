import React from "react";
import g1 from "../assets/g1.jpg";
import g2 from "../assets/g2.jpg";
import g3 from "../assets/g3.jpg";
import g4 from "../assets/g4.jpg";
import g5 from "../assets/g5.jpg";
import g6 from "../assets/g6.jpg";
import g7 from "../assets/g7.jpg";
import g8 from "../assets/g8.jpg";
import g9 from "../assets/g9.jpg";
import g10 from "../assets/g10.jpg";

import "./gallery.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Gallery = () =>{
    const images = [g1,g5,g2,g4,g7,g3,g5,g9];
    return(
        <div className="gallery-container">
            <button className="gallery-btn">
                Gallery
            </button>
            <h2 className="gallery-heading">
                Store you creativity in our website
            </h2>
            {/* <div className="gallery-grid">
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Food ${index + 1}`} className="gallery-img" />
                ))}
            </div> */}
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
                <Masonry gutter="1rem">
                    {images.map((item, index) => (
                    <img
                        className="masonry_img"
                        src={item}
                        key={index}
                        alt=""
                        style={{ width: "100%", display: "block", borderRadius: "10px" }}
                    />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}

export default Gallery;