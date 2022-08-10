import React from "react";
import defaultImg from '../utils/image-not-found.png'
import s from '../styles/Card.module.css'

export default function Card({ title, diets, image}) {
  return (
    <div className={s.card}>
      
       
        <section className={s.cardImg}>
          {image ? (<img src={image} className={s.cardImg} alt='not found'/>) : (<img src={defaultImg} className={s.cardImg} width='300px' alt="default"/>)}
        </section>

        <div className={s.title}>
          <h4>{title}</h4>
        </div>

        <div className={s.diets}>
          {diets.map((e, index) => (
            <p key={index}>{e.name ? e.name.toUpperCase() : e.toUpperCase()}</p>
          ))}
        </div>

      </div>

  );
}





      // {/* <div className={s.btnContainer}>
      //     <Link to={`/recipes/${id}`}>
      //       {/* <button className={s.btn}>See more</button> */}
      //     </Link>
      // </div> */}
