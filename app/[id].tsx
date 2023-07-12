import { View, Text, StyleSheet, Image, ScrollView, Pressable} from "react-native";

import React from "react";
import { Link, useSearchParams } from "expo-router";
import { DataContext } from "./context/DataContext";
import { RecipeContext } from "./context/RecipeContext";
import { useContext } from "react";


function RecipeDetailPage(){
    const { id } = useSearchParams()
    const {recipeData, fractionAmounts, abbreviatedUnits} = useContext(DataContext)
    const {addRecipe, removeFromList, savedRecipes} = useContext(RecipeContext)
    const thisRecipe = recipeData.find((recipe) => recipe.id == id)

    const ingredientAmounts = thisRecipe.nutrition.ingredients.map((ingredient) => (
        <Text key={ingredient.id} style={{marginLeft: 15,marginRight: 20, marginTop: 10, marginBottom: 10, fontFamily: 'KohinoorTelugu-Regular', fontSize: 15,}}>{fractionAmounts(ingredient.amount)} {abbreviatedUnits(ingredient.unit)}</Text>
    ))

    const ingredientNames = thisRecipe.nutrition.ingredients.map((ingredient) => (
        <Text key={ingredient.id} style={{marginLeft: 10,marginRight: 20, marginTop: 10, marginBottom: 10, fontFamily: 'KohinoorTelugu-Regular', fontSize: 15}}>{ingredient.name}</Text>
    ))

    const recipeInstructions = thisRecipe.analyzedInstructions[0].steps.map((recipe) => (
        <View key={recipe.number} style={{flexDirection: "row", padding: 10, marginTop: 5, alignItems: "center"}} >
            <Text style={{fontFamily: 'KohinoorTelugu-Regular', fontSize: 15, marginRight: 30, marginLeft: 15}}>{recipe.number}</Text>
            <Text style={{fontFamily: 'KohinoorTelugu-Regular', fontSize: 15, width: 300}}>{recipe.step}</Text>
        </View> 
    ))

    return(
        <View style={{flex: 1}}>
        <ScrollView style={styles.recipeView}>
            <Image source={{uri: thisRecipe.image}} style={{height: 200 , resizeMode: "stretch"}}/>
            <Text style={styles.title}>{thisRecipe.title} </Text>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5, marginTop:5, alignItems: "center"}}>
                <View style={{flexDirection: "row", marginLeft: 10, marginBottom: 15}} >
                    <Text style={{fontFamily: 'KohinoorTelugu-Regular', fontSize: 15, marginRight: 5,}}> Source:</Text>
                    <Link href={thisRecipe.sourceUrl} style={{fontFamily: 'KohinoorTelugu-Regular',color: 'blue', textDecorationLine: "underline", fontSize: 15}}>Link</Link>
                </View>
                <Pressable 
                    style={savedRecipes.includes(thisRecipe) ? styles.recipeSaved : styles.addRecipe}
                    onPress={savedRecipes.includes(thisRecipe) ? () => removeFromList(thisRecipe.id) : () => addRecipe(thisRecipe)}
                >
                    <Text style={savedRecipes.includes(thisRecipe) ? styles.remove : styles.save } >{savedRecipes.includes(thisRecipe) ? 'remove -' : 'save +'}</Text>
                </Pressable>
            </View>
            
            <View style={{justifyContent: "space-between", flexDirection: "row", marginLeft: 10, marginRight: 10}} >
                <View style={{flexDirection: "row"}} >
                    <Image source={require('food-rn/assets/icons/timer.png')} style={{height: 18, width: 18, marginRight: 2, marginTop: 2}} />
                    <Text style={{fontSize: 18, fontFamily: 'KohinoorTelugu-Regular'}} >{thisRecipe.readyInMinutes}min</Text>
                </View>
                <Text style={{fontSize: 18, fontFamily: 'KohinoorTelugu-Regular'}} >Servings: {thisRecipe.servings}</Text>
            </View>
            <Text style={{fontSize: 18, fontFamily: 'KohinoorTelugu-Regular', marginTop: 15, marginLeft: 10, marginBottom: 10}} >
                Ingredients
            </Text>
            <View style={styles.recipeList} >
               <View>
                    {ingredientAmounts}
               </View>
               <View>
                    {ingredientNames}
               </View>
            </View>
            <Text style={{fontSize: 18, fontFamily: 'KohinoorTelugu-Regular', marginTop: 10, marginLeft: 10, marginBottom: 10}} >
                Instructions
            </Text>
            <View style={styles.recipeSteps} >
                {recipeInstructions}
            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    recipeView: {
        flex: 1
    },
    title: {
        fontFamily: 'KohinoorTelugu-Regular',
        fontSize: 25,
        fontWeight: "bold",
        margin: 10, 
        
    },
    recipeList: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    recipeSteps: {
        borderTopWidth: 1,
        marginBottom: 40
    },
    addRecipe: {
        borderWidth: 2,
        padding: 5,
        marginRight: 15,
        borderRadius: 15, 
        backgroundColor: '#13a02b',
        borderColor: '#13a02b' ,
        justifyContent: "center",
        alignItems: "center"
    },
    recipeSaved: {
        borderWidth: 2,
        padding: 5,
        marginRight: 15,
        borderRadius: 15, 
        backgroundColor: '#D21a1d',
        borderColor: '#D21a1d' ,
        justifyContent: "center",
        alignItems: "center"
    },
    save: {
        fontSize: 20, 
        color: 'whitesmoke', 
        fontFamily: 'KohinoorTelugu-Regular'
    },
    remove: {
        fontSize: 20, 
        color: 'whitesmoke', 
        fontFamily: 'KohinoorTelugu-Regular'
    }
})

export default RecipeDetailPage