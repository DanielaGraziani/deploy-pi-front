import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/Landing.module.css";

export default function LandingPage() {
  return (
    <div className={s.landingContainer}>
      <div className={s.textContainer}>
        <h3 className={s.landingTitle}>
          Welcome <span className={s.to}>to</span>
        </h3>
        <div className={s.text}>
          <h2>Recipe Ideas!</h2>
        </div>
      </div>

      <div className={s.buttonContainer}>
        <Link to="/recipes">
          <button className={s.button}>Enter</button>
        </Link>
      </div>
    </div>
  );
}
