import React, { useEffect, useState } from "react";
import './MeteorDemo.css'
export const Meteors = ({ number = 20 }) => {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => {
      const size = Math.random() * 5 + 2 + "px";
      const speed = Math.random() * 5 + 2 + "s";
      const delay = Math.random() * 1 + 0.2 + "s";
      const xDirection = Math.random() * 50 + "vw"; // Reduced to 50vw
      const yDirection = Math.random() * 50 + "vh"; // Reduced to 50vh

      return {
        width: size,
        height: size,
        left: Math.random() * window.innerWidth * 0.5 + "px", // Adjusted to keep within the viewport
        top: Math.random() * window.innerHeight * 0.5 + "px", // Adjusted to keep within the viewport
        animationDelay: delay,
        animationDuration: speed,
        transform: `translate(${xDirection}, ${yDirection})`,
      };
    });
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className="meteor"
          style={style}
        />
      ))}
    </>
  );
};
