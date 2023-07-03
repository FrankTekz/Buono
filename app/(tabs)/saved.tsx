import * as React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DataContext } from '../context/DataContext';
import { RecipeContext } from '../context/RecipeContext';

export default function about(){
    const {openRecipe, savedRecipes} = React.useContext(RecipeContext)

    return(
        <View>
            <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, marginRight: 10, marginLeft: 10, paddingBottom: 10, paddingTop: 15}} >
                    <Text style={{fontSize: 22, fontFamily: 'KohinoorTelugu-Regular', marginBottom: 5}} >
                        Saved Recipes
                    </Text>
            </View>
            <FlatList
                data={savedRecipes}
                maxToRenderPerBatch={6}
                removeClippedSubviews={true}
                renderItem={({ item }) => (
                    //this is where the card component begins
                <TouchableOpacity onPress={() => openRecipe(`/${item.id}`)} >
                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}> 
                    <View style={styles.card} >
                        <View>
                            <Image 
                                style={{justifyContent: 'center', alignItems: 'center', height: 130, resizeMode: 'cover'}} 
                                source={{ uri: item.image }} 
                                />
                            <Text style={styles.title} >{item.title}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5, justifyContent: 'space-between'}} >
                            <View style={{flexDirection: 'row'}} >
                                <Image 
                                source={require('food-rn/assets/icons/timer.png')} 
                                style={{height: 14, width: 14, marginRight: 2, marginTop:2}} 
                                />
                                <Text style={{fontSize: 14, fontFamily: 'KohinoorTelugu-Regular'}}> 
                                    {item.readyInMinutes}min
                                </Text>
                            </View>
                                <Text style={{fontSize: 14, fontFamily: 'KohinoorTelugu-Regular', marginRight: 5}}>
                                ${Math.ceil(item.pricePerServing/45 * 100) / 100}/serving
                                </Text>
                        </View>
                        <View style={styles.nutrients}>
                            <Text style={styles.macros}>
                                Cal: {item.nutrition.nutrients[0].amount.toString().split('.')[0]}
                            </Text>
                            <Text style={styles.macros}>
                                P: {item.nutrition.nutrients[8].amount.toString().split('.')[0]}g
                            </Text>
                            <Text style={styles.macros}>
                                C: {item.nutrition.nutrients[3].amount.toString().split('.')[0]}g
                            </Text>
                            <Text style={styles.macros}>
                                F: {item.nutrition.nutrients[1].amount.toString().split('.')[0]}g
                            </Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                //where card component ends
                    )}
                    //Setting the number of column
                    numColumns={2}
                />
        </View>
    )

    
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        width: 185,
        height: 255,
        marginRight: 0,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        shadowOffset: {
            width: 2, 
            height: 2
        },
        shadowOpacity: 1,
        shadowColor: 'grey',
        shadowRadius: 2
    },
    title: {
        fontFamily: 'KohinoorTelugu-Regular',
        fontSize: 16,
        marginTop: 5,
        marginLeft: 5
    },
    searchContainer: {
        flex: 1,
        marginTop: 20
    },
    searchView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    searchBar: {
        borderWidth: 2,
        borderColor: 'lightgrey',
        borderRadius: 15,
        padding: 10,
        width: '75%',
        margin: 10,
        backgroundColor: 'white',
        fontFamily: 'KohinoorTelugu-Regular'
    }, 
    searchBtn: {
        borderRadius: 15,
        padding: 12,
        margin: 10,
        backgroundColor: '#FF862A'
    },
    nutrients: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    }, 
    macros: {
        fontFamily: 'KohinoorTelugu-Light', 
        fontWeight: 'bold', 
        letterSpacing: .5, 
        fontSize: 12
    }
})