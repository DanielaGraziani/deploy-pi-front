import React from 'react'
import s from '../styles/Pagination.module.css'

export default function Pagination({allRecipes, paginate, recipePerPage}) {
  
  const pageNumbers=[]
  
  for (let i = 0; i < Math.ceil(allRecipes / recipePerPage); i++) {
    pageNumbers.push(i+1);
  }
  
  return (

    
      <div className={s.paginationContainer}>
        <ul className={s.pagination}>
        {pageNumbers?.map((num) => (
            <li key={num} className={s.number}>
            <a onClick={() => paginate(num)}>{num}</a>
          </li>
        ))}
      </ul>
    </div>

  


  )
}

