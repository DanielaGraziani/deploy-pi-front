import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByName } from "../actions";
import s from "../styles/SearchBar.module.css";
import Empty from "../components/Empty";
import Swal from "sweetalert2";

export default function SearchBar({ setCurrentPage }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input || input === " " || !input.trim().length) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Sending invalid or null field',
        showConfirmButton: false,
        timer: 2500
      })
      // alert("Sending invalid or null field");
    } else if (input || input.trim().length) {
      dispatch(getRecipeByName(input));
      setInput("");
      setCurrentPage(1);
    }
    // setCurrentPage(1);
  };

  return (
    <div>
      <form className={s.searchContainer} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.searchBox}>
          <input
            className={s.searchInput}
            type="text"
            value={input}
            placeholder="Search recipe..."
            onChange={(e) => handleInputChange(e)}
          />

          <button className={s.searchButton} type="submit"></button>
        </div>
      </form>
    </div>
  );
}
