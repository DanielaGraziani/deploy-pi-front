import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/Navbar.module.css";
import { useDispatch } from "react-redux";
import { getAllRecipesHome } from "../actions";
import logo from "../utils/vegetables.png";

export default function Navbar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllRecipesHome());
    setCurrentPage(1);
  };

  return (
    <div className={s.navBarContainer}>
      <nav className={s.navbar}>
        <div>
          <button
            className={s.home}
            onClick={(e) => {
              handleClick(e);
            }}>
            Reset
          </button>
        </div>

        <img className={s.logoImg} src={logo} alt="logo" />

        <div>
          <button className={s.act}>
            <Link className={s.link} to={"/recipe"}>
              Create Recipe
            </Link>
          </button>
        </div>
      </nav>
    </div>
  );
}
