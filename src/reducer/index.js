import {
  GET_ALL_RECIPES_HOME,
  GET_RECIPE_BY_ID,
  GET_RECIPE_BY_NAME,
  ORDER_ALPHABETIC_ASC,
  ORDER_ALPHABETIC_DES,
  ORDER_BY_HIGH_SCORE,
  ORDER_BY_LOW_SCORE,
  FILTER_RECIPES_BY_DIET,
  GET_TYPES_OF_DIET,
  POST_RECIPE,
  DELETE_RECIPE,
  RESET,
} from "../actions/types.js";


const initialState = {
  recipesHome: [],
  recipesHomeCopy: [],
  recipeID: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES_HOME:
      return {
        ...state,
        recipesHome: action.payload,
        recipesHomeCopy: action.payload,
      };

    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipeID: action.payload,
      };

    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipesHome: action.payload,
      };

    case GET_TYPES_OF_DIET:
      return {
        ...state,
        diets: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
      };


    // ORDEEER A-Z

    case ORDER_ALPHABETIC_ASC:
      let ascAlphabet = [...state.recipesHome];

      let orderAsc = ascAlphabet.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        } else if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        recipesHome: orderAsc,
      };

    case ORDER_ALPHABETIC_DES:
      let descAlphabet = [...state.recipesHome];
      let orderDesc = descAlphabet.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        recipesHome: orderDesc,
      };

    //^ORDER SCOORE

    case ORDER_BY_HIGH_SCORE:
      let orderScore = state.recipesHome.slice().sort((a, b) => {
        

        if (b.healthScore < a.healthScore) {
          return -1;
        } else if (a.healthScore > b.healthScore) {
          return 1;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        recipesHome: orderScore,
      };

    case ORDER_BY_LOW_SCORE:
      let LowOrderScore = state.recipesHome.slice().sort((a, b) => {
        // const high = a.healthScore
        // const low = b.healthScore

        if (a.healthScore < b.healthScore) {
          return -1;
        } else if (b.healthScore > a.healthScore) {
          return 1;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        recipesHome: LowOrderScore,
      };


    //^FILTRADOOO

    case FILTER_RECIPES_BY_DIET:

      const recipes = [...state.recipesHomeCopy]

   /* Adding the string 'vegetarian' to the diets array if the recipe is vegetarian. */
      const vegetarian= recipes.map((v)=>{
        if(v.vegetarian && !v.diets.includes('vegetarian')) v.diets.push('vegetarian')
      })
      
      const result =
        action.payload === "default"
          ? recipes
          : recipes.filter((el) => {
               let db = el.diets.map((d) => d.name);
               let api= el.diets.map(d=> d)
              if (
                db.includes(action.payload) || api.includes(action.payload) || vegetarian.includes(action.payload)
              ) {
                return el;
              }
              
            });
      
      return {
        ...state,
        recipesHome: result,
      };

      case DELETE_RECIPE:
        return {
          ...state,
        };

      case RESET:
        return{
          ...state,
          recipeID: []
        }

    default:
      return state;
  }
};

export default rootReducer;
