import { createContext, useState} from "react";
import { useRouter } from "expo-router";

const RecipeContext = createContext();

function RecipeContextProvider(props){
    const [savedRecipes, setSavedRecipes] = useState([])
    const router = useRouter();

    function openRecipe(link){
        router.push(link)
    }

    function addRecipe(recipe){
        setSavedRecipes(previousList => [...previousList, recipe])
        console.log(savedRecipes, 'SAVED')
    }

    function removeFromList(id) {
        setSavedRecipes(prevItems => prevItems.filter(recipe => recipe.id !== id))
    }

    return(
        <RecipeContext.Provider value={{addRecipe, savedRecipes, openRecipe, removeFromList}} >
            {props.children}
        </RecipeContext.Provider>
    )

}

export {RecipeContextProvider, RecipeContext}