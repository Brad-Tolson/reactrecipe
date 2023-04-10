import React, { useState } from "react";
import RecipeCard from "../RecipeCard"
import styles from "./HomeScreen.module.css";
import { BiSearchAlt2 } from "react-icons/bi";

const RecipeContainer = ({recipes}) => {
  const [search, setSearch] = useState("");

  const recipeDisplay = recipes
    .filter((recipe, index) => {
      let title = recipe.recipe_name.toLowerCase()
      let searchParams = search.toLowerCase()
      return title.includes(searchParams)
    })
    .map((recipe, index) => {
      return <RecipeCard recipe={recipe}/>
    })

  return (
    <section className={styles.recipe_section}>
      <h2></h2>
      <span className={styles.search_bar}>
        <BiSearchAlt2 size="2em" color="#DA7635" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a Recipe"
        />
      </span>
      <div className={styles.recipe_container}>
        {recipeDisplay ? recipeDisplay : <h2>No Recipes :(</h2>}
      </div>
    </section>
  );
};

export default RecipeContainer;
