import { createContext, useState, useEffect, useContext} from "react";
import { Keyboard } from "react-native";
import { FilterContext } from "./FilterContext";

const DataContext = createContext();

function DataContextProvider(props){
    const [recipeData, setRecipeData] = useState([])
    const [displayedData, setDisplayedData] = useState([])
    const [text, setText] = useState('')
    const {filters, selectedCalories, activeFilters, selectedMinutes,} = useContext(FilterContext)

    //function that holds the api call
    async function getRecipeData() {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${text}&apiKey=061eea07da374088a2a88a00827312ab&addRecipeNutrition=true&number=20&type=true&addRecipeInformation=true`);
        if(!response.ok){
            throw new Error('cannot fetch api')
        }
        const data = await response.json()
        let testData = data.results
        setRecipeData(testData)
    }

    //sets state for the data that is actually displayed (copy of initial data)
    useEffect(() => {
            setDisplayedData(recipeData)
    }, [recipeData])

    //api call function is within the onPress function for the search bar
    function handleSearch(){
        Keyboard.dismiss()
        getRecipeData()
    }

    //removes any duplicates within data
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    // filter logic
      function filterData(filters){
        const {vegan, vegetarian, dairyFree, glutenFree, lowFodmap} = filters; 
        let tempProducts = [...recipeData];
        let filteredRecipes = [];

        if(vegan){
            for (const recipe of tempProducts){
                if(recipe.vegan){
                    filteredRecipes.push(recipe);
                }
            }
        }

        if(vegetarian){
            for (const recipe of tempProducts){
                if(recipe.vegetarian){
                    filteredRecipes.push(recipe);
                }
            }
        }

        if(dairyFree){
            for (const recipe of tempProducts){
                if(recipe.dairyFree){
                    filteredRecipes.push(recipe);
                }
            }
        }

        if(glutenFree){
            for (const recipe of tempProducts){
                if(recipe.glutenFree){
                    filteredRecipes.push(recipe);
                }
            }
        } 

        if(lowFodmap){
            for (const recipe of tempProducts){
                if(recipe.lowFodmap){
                    filteredRecipes.push(recipe);
                }
            }
        }

        if (selectedCalories != 0 && activeFilters.length == 0){
            filteredRecipes = recipeData.filter((recipe) => Number(recipe.nutrition.nutrients[0].amount.toString().split('.')[0]) <= Number(selectedCalories))
        } 
        
        if (selectedCalories != 0 && activeFilters.length > 0){
            filteredRecipes = filteredRecipes.filter((recipe) => Number(recipe.nutrition.nutrients[0].amount.toString().split('.')[0]) <= Number(selectedCalories))
        }

        if (selectedMinutes != 0 && activeFilters.length == 0){
            filteredRecipes = recipeData.filter((recipe) => Number(recipe.readyInMinutes) <= Number(selectedMinutes))
        } 
        
        if (selectedMinutes != 0 && activeFilters.length > 0){
            filteredRecipes = filteredRecipes.filter((recipe) => Number(recipe.readyInMinutes) <= Number(selectedMinutes))
        }

        if (selectedCalories > 0 && selectedMinutes > 0){
            filteredRecipes = recipeData.filter((recipe) => Number(recipe.nutrition.nutrients[0].amount.toString().split('.')[0]) <= Number(selectedCalories))
            filteredRecipes = filteredRecipes.filter((recipe) => Number(recipe.readyInMinutes) <= Number(selectedMinutes))
        }

        setDisplayedData(removeDuplicates([...filteredRecipes]))
      }

      useEffect(()=> {
        if (Object.values(filters).includes(true) || selectedCalories > 0 || selectedMinutes > 0){
            filterData(filters)
        } else {
            null
        }
      }, [filters, recipeData, selectedCalories, activeFilters, selectedMinutes])

      //unit and fraction data was not adaptable to cooking terminology, so I created functions to clean them up
    const abbreviatedUnits = (unit) => {
        if (unit === "milliliters") {
            return ('ml')
        } else if (unit === 'ounces' || unit === 'ounce'){
            return ('oz')
        } else if (unit === 'pounds') {
            return ('lbs')
        } else if (unit === 'pound'){
            return ('lb')
        } else if (unit === 'tablespoons' || unit === 'tablespoon' || unit === 'Tbsp') {
            return ('tbsp')
        } else if (unit === 'teaspoons' || unit === 'teaspoon' || unit === 'Tsp') {
            return ('tsp')
        } else if (unit === 'grams' || unit === 'gram'){
            return ('g')
        } else {
            return (unit)
        }
    }

    const fractionAmounts = (amount) => {
        if (amount === .5) {
            return '1/2'
        } else if (amount === .25) {
            return '1/4'
        } else if (amount === .33) {
            return '1/3'
        } else if (amount === .75) {
            return '3/4'
        } else if (amount === .66) {
            return '2/3'
        }
        else {
            return amount
        }
    }
    
    return(
        <DataContext.Provider value={{recipeData, setRecipeData, handleSearch, text, setText, fractionAmounts, abbreviatedUnits, displayedData, setDisplayedData}} >
            {props.children}
        </DataContext.Provider>
    )

}

export {DataContextProvider, DataContext}