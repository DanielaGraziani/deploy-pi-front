import React from "react";
import s from "../styles/Error.module.css";
import { Link } from "react-router-dom";
import errorImg from "../utils/person-stressed-out-by-technology.png";

export default function Error() {
  return (
    <>
      <div className={s.error}></div>
      <div className={s.imgContainer}>
        <img width={620} height={360} className={s.errorImg} src={errorImg} alt='error' />
      </div>
      <Link to="/recipes">
        <button className={s.button}>Go back</button>
      </Link>
    </>
  );
}
