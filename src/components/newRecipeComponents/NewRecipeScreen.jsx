import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import styles from './NewRecipeScreen.css';
import axios from "axios";

const initialValues = {
  type: "",
  recipeName: "",
  imageURL: "",
  prepTime: "",
  cookTime: "",
  serves: "",
  ingredients: [],
  instructions: "",
};

const onSubmit = async (values, { setSubmitting }, ingredients) => {
  values.ingredients = ingredients;
  console.log(values);
  setSubmitting(false);

  try {
    const response = await fetch("https://recipes.devmountain.com/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to create recipe.");
    }

    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};


const NewRecipeScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const addIngredient = () => {
    setIngredients([...ingredients, { name, quantity }]);
    setName("");
    setQuantity("");
  };

  const deleteIngredient = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  return (
    <section className="form-container">
      <h1>Tell us about your Recipe!</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <div className="form-row">
              <label htmlFor="type">Type:</label>
              <div className="form-field">
                <label>
                  <Field
                    type="radio"
                    name="type"
                    value="cook"
                    checked={formik.values.type === "cook"}
                    onChange={formik.handleChange}
                  />
                  Cook
                </label>
                <label>
                  <Field
                    type="radio"
                    name="type"
                    value="bake"
                    checked={formik.values.type === "bake"}
                    onChange={formik.handleChange}
                  />
                  Bake
                </label>
                <label>
                  <Field
                    type="radio"
                    name="type"
                    value="drink"
                    checked={formik.values.type === "drink"}
                    onChange={formik.handleChange}
                  />
                  Drink
                </label>
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="recipeName">Recipe Name:</label>
              <Field
                type="text"
                name="recipeName"
                placeholder="Enter recipe name"
              />
            </div>
            <div className="form-row">
              <label htmlFor="imageURL">Image URL:</label>
              <Field
                type="text"
                name="imageURL"
                placeholder="Enter image URL"
              />
            </div>
            <div className="form-row">
              <label htmlFor="prepTime">Prep Time:</label>
              <Field
                type="text"
                name="prepTime"
                placeholder="Enter prep time"
              />
            </div>
            <div className="form-row">
              <label htmlFor="cookTime">Cook Time:</label>
              <Field
                type="text"
                name="cookTime"
                placeholder="Enter cook time"
              />
            </div>
            <div className="form-row">
              <label htmlFor="serves">Serves:</label>
              <Field type="text" name="serves" placeholder="Enter serves" />
            </div>
            <div className="form-row">
              <label htmlFor="ingredients">Ingredients:</label>
              <div className="ingredient-inputs">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter ingredient name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button type="button" onClick={addIngredient}>
                  Add
                </button>
              </div>
              <FieldArray name="ingredients">
                {(arrayHelpers) => (
                  <div className="ingredient-list">
                    {ingredients.map((ingredient, index) => (
                      <div className="ingredient" key={index}>
                        <p>
                          {ingredient.name} - {ingredient.quantity}
                        </p>
                        <button
                          type="button"
                          onClick={() => deleteIngredient(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    {formik.values.ingredients.map((ingredient, index) => (
                      <div className="ingredient" key={index}>
                        <p>
                          {ingredient.name} - {ingredient.quantity}
                        </p>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="form-row">
              <label htmlFor="instructions">Instructions:</label>
              <Field
                as="textarea"
                name="instructions"
                placeholder="Enter instructions"
              />
            </div>
            <div className="form-row">
              <button type="submit" disabled={formik.isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NewRecipeScreen;
