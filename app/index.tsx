import React from "react";
import { Redirect } from "expo-router";

export default function StartPage() {

  // fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=061eea07da374088a2a88a00827312ab&addRecipeNutrition=true')
  //   .then(res => res.json())
  //   .then(data => console.log(data.results))

  return (
      <Redirect href='/search'/>
  );
}
