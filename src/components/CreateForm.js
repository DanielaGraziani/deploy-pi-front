import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRecipe, getTypesOfDiets } from "../actions";
import { Link } from "react-router-dom";
import s from "../styles/CreateForm.module.css";
import Swal from "sweetalert2";

const validateForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!form.title.trim()) {
    errors.title = "This field is required";
  }

  if (typeof form.title.trim() !== "undefined") {
    if (!regexName.test(form.title.trim())) {
      errors.title = "This fild only accept letters";
    }
  }

  if (!form.summary.trim()) {
    errors.summary = "This fields is required";
  }

  if (typeof form.summary.trim() !== "undefined") {
    if (!regexName.test(form.summary.trim())) {
      errors.summary = "This fild only accept letters";
    }
  }

  if (!form.healthScore) {
    errors.healthScore = "This fild is required";
  }

  if (parseInt(form.healthScore) < 1 || parseInt(form.healthScore) > 100) {
    errors.healthScore = "The score must be greater than 0 and less than 100";
  }

  if (!form.steps.length) {
    errors.steps = "This fild is required";
  }

  if (!form.diets.length) {
    errors.diet = "This field is required";
  }

  return errors;
};

export default function CreateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diets = useSelector((state) => state.diets);

  const [errorsForm, setErrorsForm] = useState({
    diets: "this fild is required",
  });

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: "",
    steps: "",
    readyInMinutes: "",
    servings: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getTypesOfDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrorsForm(
      validateForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectRecipes = (e) => {
    if (!form.diets.includes(e.target.value))
      setForm({
        ...form,
        diets: [...new Set([...form.diets, e.target.value])],
      });
    setErrorsForm(
      validateForm({
        ...form,
        diets: [...form.diets, e.target.value],
      })
    );
  };

  const handleCreateDiet=(e)=>{
    setForm({
      ...form,
        diets: [e.target.value]
    })
    setErrorsForm(
      validateForm({
        ...form,
        diets: [e.target.value]
      })
    )
  }

  const handleDelete = (e) => {
    setForm({
      ...form,
      diets: form.diets.filter((el) => el !== e),
    });
    setErrorsForm(
      validateForm({
        ...form,
        diets: form.diets.filter((el) => el !== e),
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //si hay errores no enviar
    if (Object.keys(errorsForm).length !== 0) {
      alert("The recipe cannot be created with the supplied data ");
    } else {
      e.preventDefault();
      dispatch(postRecipe(form));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your recipe has been created succesfully',
        showConfirmButton: false,
        timer: 4000
      })
      navigate("/recipes");
      setForm({
        title: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
      });
    }
  };
  
  

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p className={s.title}>CREATE YOUR OWN RECIPE</p>
        </div>

        <div>
          <p className={s.pTitle}>Title <span className={s.sign}>*</span></p>
          <input
            type="text"
            name="title"
            value={form.title}
            className={s.input}
            onChange={(e) => handleChange(e)}
          />

          {errorsForm.title ? (
            <h6 className={s.error}>{errorsForm.title}</h6>
          ) : (
            false
          )}
        </div>


        <div>
          <p className={s.pTitle}>Score <span className={s.sign}>*</span></p>
          <input
            type="number"
            name="healthScore"
            min={1}
            max={100}
            className={s.input}
            value={form.healthScore}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.healthScore ? (
            <h6 className={s.error}>{errorsForm.healthScore}</h6>
          ) : (
            false
          )}
        </div>

          <div>
          <p className={s.pTitle}>preparation time</p>
          <input
            type="number"
            name="readyInMinutes"
            min={1}
            max={100}
            className={s.input}
            value={form.readyInMinutes}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.readyInMinutes ? (
            <h6 className={s.error}>{errorsForm.readyInMinutes}</h6>
          ) : (
            false
          )}
        </div>

        <div>
          <p className={s.pTitle}>Servings</p>
          <input
            type="number"
            name="servings"
            min={1}
            max={15}
            className={s.input}
            value={form.servings}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.servings ? (
            <h6 className={s.error}>{errorsForm.servings}</h6>
          ) : (
            false
          )}
        </div>

        <div>
          <p className={s.pTitle}>Summary <span className={s.sign}>*</span></p>
          <input
            className={s.input}
            type="text"
            name="summary"
            value={form.summary}
            onChange={(e) => handleChange(e)}
          />
          {errorsForm.summary ? (
            <h6 className={s.error}>{errorsForm.summary}</h6>
          ) : (
            false
          )}
        </div>


        <div>
          <p className={s.pTitle}>Instructions <span className={s.sign}>*</span></p>
          <textarea
            type="text"
            name="steps"
            value={form.steps}
            cols="30"
            rows="10"
            className={s.inputSteps}
            onChange={(e) => handleChange(e)}
          />

          {errorsForm.steps ? (
            <h6 className={s.error}>{errorsForm.steps}</h6>
          ) : (
            false
          )}
        </div>

        <div>
          <p className={s.pTitle}>Create Diet</p>
          <input
            type="text"
            name='diets'
            className={s.input}
            // placeholder="insert your own diet"
            onChange={(e) => handleCreateDiet(e)}
            />
        </div>

        <div>
          <p className={s.pTitle}>Type of diets <span className={s.sign}>*</span> </p>

          <select
            className={s.sForm}
            onChange={(e) => handleSelectRecipes(e)}
            defaultValue="default"
          >
            <option value="default" disabled>
              All
            </option>
            {diets &&
              diets.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
          </select>

          {errorsForm.diets ? <h6>{errorsForm.diets}</h6> : false}
        </div>

        <div className={s.selectDiet}>
          {form.diets.map((diet) => (
            <div>
              <input
                key={diet}
                type="button"
                value="X"
                className={s.selectX}
                // onBlur={handleBlur}
                onClick={() => handleDelete(diet)}
              />
              <p className={s.dietTitle}>{diet}</p>
            </div>
          ))}
          {/* {errorsForm.diets ? <h6>{errorsForm.diets}</h6> : false} */}
        </div>

        <div className={s.selectContainer}>
          <button
            className={s.buttonSend}
            type="submit"
            name="submit"
            disabled={Object.keys(errorsForm).length === 0 ? false : true}
          >SEND
          </button>
      <div>
        <Link to="/recipes">
          <button className={s.buttonGo}>Go Back</button>
        </Link>
      </div>
        </div>
      </form>

    </div>
  );
}
