import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailImage from "./DetailImage";
import axios from 'axios';
import styles from "./DetailScreen.module.css"

const DetailScreen = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const url = "https://recipes.devmountain.com";
  
  useEffect(() => {
    axios.get(`${url}/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  

  return (
    <section>
      <DetailImage image={recipe.image_url} title={recipe.recipe_name} />
      <div className={styles.details_container}>
        {/* <div className={styles.detail_half}> */}
          <div className={styles.ingredients_container}>
            <h2>Recipe</h2>
            <h4>Prep Time: {recipe.prep_time}</h4>
            <h4>Cook Time: {recipe.cook_time}</h4>
            <h4>Serves: {recipe.serves}</h4>
            <br/>
            <h2>Ingredients</h2>
            {recipe.ingredients && recipe.ingredients.map((ing, index) => {
              return <h4>{ing.quantity} {ing.ingredient}</h4>
            })}
          </div>

        <div className={styles.instruction_container}>
          <h2>Instructions</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {recipe.instructions && JSON.parse(recipe.instructions)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailScreen;
