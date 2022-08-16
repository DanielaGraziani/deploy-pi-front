import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByID, deleteRecipe, reset } from "../actions";
import { Link, useParams, useNavigate } from "react-router-dom";
import defaultImg from "../utils/image-not-found1.png";
import Loader from "./Loader";
import s from "../styles/Details.module.css";
import brocco from "../utils/piece-of-broccoli.png";
import pencil from "../utils/spatula-and-whisk-in-pot.png";
import {
  BsFillStarFill,
  BsFillClockFill,
  BsFillPeopleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import Swal from "sweetalert2";

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector((state) => state.recipeID);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeByID(id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Your recipe has been deleted',
      showConfirmButton: false,
      timer: 4000
    })
    navigate("/recipes");
  };

  console.log(details.length);

  return (
    <div>
      <div className={s.container}>
        {typeof details.id === "string" && (
          <button onClick={handleDelete}>
            <div className={s.delete}>
              <BsFillTrashFill />
              <h6>Delete</h6>
            </div>
          </button>
        )}
        {details && details.length <= 0 ? (
          <div className={s.spinnerContainer}>
            <Loader />
          </div>
        ) : (
          <div>
            <div className={s.title}>
              <h2>{details?.title}</h2>
            </div>

            <div>
              <div className={s.imageContainer}>
                {details.image ? (
                  <img src={details.image} className={s.img} alt="not found" />
                ) : (
                  <img
                    src={defaultImg}
                    className={s.img}
                    height="350px"
                    alt="default"
                  />
                )}
              </div>

              <div className={s.type}>
                {details.diets &&
                  details.diets.map((el) => (
                    <p className={s.typeItems}>{el.name}</p>
                  ))}
              </div>

              <div className={s.scoreContainer}>
                <div className={s.healthScore}>
                  <BsFillStarFill /> {details?.healthScore}
                </div>

                <div className={s.clock}>
                  <BsFillClockFill /> {details.readyInMinutes}{" "}
                  <span className={s.min}>min</span>
                </div>

                <div className={s.person}>
                  <BsFillPeopleFill /> {details.servings}
                </div>
              </div>
            </div>

            <div className={s.summaryContainer}>
              <h3 className={s.summaryTitle}>Summary</h3>
              <div
                className={s.summaryText}
                dangerouslySetInnerHTML={{ __html: details?.summary }}
              />
            </div>

            <img className={s.brocco} src={brocco} alt="broccoli" />

            <div className={s.stepContainer}>
              <h3 className={s.stepTitle}>Steps:</h3>
              <ul>
                <p className={s.stepTitleContainer}>
                  {Array.isArray(details?.steps)
                    ? details.steps.map((e) =>
                        e.steps.map((f) => (
                          <li className={s.stepItem} key={f.number}>
                            {f.number} - {f.step}
                          </li>
                        ))
                      )
                    : details?.steps}
                </p>
              </ul>
            </div>

            <img className={s.pencil} src={pencil} alt="spatula" />
            <Link to={"/recipes"}>
              <button className={s.button}> Go Back </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
