import * as React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native';
import { useContext} from 'react';
import { DataContext } from '../context/DataContext';
import { RecipeContext } from '../context/RecipeContext';
import { FilterContext } from '../context/FilterContext';

export default function search(){
    const {text, setText, handleSearch, displayedData, recipeData, setDisplayedData} = useContext(DataContext);
    const {activeFilters, activeSliders} = useContext(FilterContext)
    const {openRecipe} = useContext(RecipeContext)

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center',}}>
            <View style={styles.searchView} >
            <TextInput 
                placeholder='search'
                onChangeText={newText => setText(newText)} 
                placeholderTextColor='black' 
                style={styles.searchBar} 
                defaultValue={text}
            />
            
            <Pressable style={({pressed}) => [
                styles.searchBtn,
                pressed && {opacity: .8}
            ]} 
            onPress={handleSearch}
            >
                <Image style={{height: 30, width: 30}} source={require("food-rn/assets/icons/search-filled.png")} />
            </Pressable>
            </View>
            <FlatList
                data={activeFilters.length > 0 || Object.values(activeSliders).includes(true) ? displayedData : recipeData}
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
                    numColumns={2}
                />
                </SafeAreaView>
            );
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