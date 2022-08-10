import React from "react";
import {filterRecipesByDiet} from '../actions'
import { useDispatch} from "react-redux";
import s from '../styles/Orders.module.css'


export default function Filter({setCurrentPage}) {
  const dispatch = useDispatch();
 
  
  function handleDiets(e) {
    e.preventDefault()
    dispatch(filterRecipesByDiet(e.target.value));
     setCurrentPage(1)
   
  }

 

  return (
    <div className={s.filterContainer}>
      <select className={s.sFilter} onChange={(e) => handleDiets(e)}>
        <option value="default"> All Diets</option>
        <option value="gluten free"> Gluten Free</option>
        <option value="dairy free"> Dairy Free</option>
        <option value="lacto ovo vegetarian"> Lacto Ovo Vegetarian</option>
        <option value="vegan"> Vegan</option>
        <option value="paleolithic"> Paleolithic</option>
        <option value="primal"> Primal</option>
        <option value="whole 30"> Whole 30</option>
        <option value="pescatarian"> Pescatarian</option>
        <option value="fodmap friendly"> Fodmap Friendly</option>
       <option value="ketogenic">Ketogenic</option>
      <option value="vegetarian"> Vegetarian</option>
      </select>
     
      </div>
      );
    }












