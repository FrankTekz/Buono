import { View, Text, StyleSheet} from "react-native";
import React, {useContext, useEffect} from "react";
import {Slider} from '@miblanchard/react-native-slider'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FilterContext } from "./context/FilterContext";


function FilterModal(){
    const {filters, setFilters, setActiveFilters, selectedCalories, setSelectedCalories, selectedMinutes, setSelectedMinutes, activeSliders, setActiveSliders} = useContext(FilterContext)

      function handleChangeCalories(value){
        setSelectedCalories(value)
      }

      function handleChangeMinutes(value){
        setSelectedMinutes(value)
      }
      
      useEffect(() => {
        let filterEntries = Object.entries(filters)
        setActiveFilters(filterEntries.filter((filter) => filter.includes(true)))
      }, [filters])

      useEffect(() => {
        if (selectedCalories > 0){
            setActiveSliders(prevState => ({...prevState, caloriesActive: true }))
        } else {
            setActiveSliders(prevState => ({...prevState, caloriesActive: false }))
        }

        if (selectedMinutes > 0){
            setActiveSliders(prevState => ({...prevState, minutesActive: true }))
        } else {
            setActiveSliders(prevState => ({...prevState, minutesActive: false }))
        }
      }, [selectedMinutes, selectedCalories])


    return (
        <View >
            <View style={{ justifyContent: 'center',  alignItems: 'center', borderBottomWidth: 1, marginRight: 15, marginLeft: 15, paddingBottom: 10, marginTop: 15}}>
                <Text style={{fontSize: 22, fontFamily: 'KohinoorTelugu-Regular', marginBottom: 5}}>select all that apply</Text>
            </View>
            <View style={{flexDirection: "row"}} >
                <View style={styles.filterContainer} >
                <BouncyCheckbox
                        text={'vegetarian'}
                        onPress={() => setFilters(prevState => ({...prevState, vegetarian: !prevState.vegetarian}))}
                        isChecked={filters.vegetarian}
                        style={{padding: 10}}
                        textStyle={{textDecorationLine: 'none', color: 'black', fontSize: 18, fontFamily: 'KohinoorTelugu-Regular'}}
                    />
                    <BouncyCheckbox
                        text={'vegan'}
                        onPress={()=>setFilters(prevState => ({...prevState, vegan: !prevState.vegan}))}
                        isChecked={filters.vegan}
                        style={{padding: 10}}
                        textStyle={{textDecorationLine: 'none', color: 'black', fontSize: 18, fontFamily: 'KohinoorTelugu-Regular'}}
                    />
                     <BouncyCheckbox
                        text={'glutenFree'}
                        onPress={() => setFilters(prevState => ({...prevState, glutenFree: !prevState.glutenFree}))}
                        isChecked={filters.glutenFree}
                        style={{padding: 10}}
                        textStyle={{textDecorationLine: 'none', color: 'black', fontSize: 18, fontFamily: 'KohinoorTelugu-Regular'}}
                    />
                    <BouncyCheckbox
                        text={'dairyFree'}
                        onPress={() => setFilters(prevState => ({...prevState, dairyFree: !prevState.dairyFree}))}
                        isChecked={filters.dairyFree}
                        style={{padding: 10}}
                        textStyle={{textDecorationLine: 'none', color: 'black', fontSize: 18, fontFamily: 'KohinoorTelugu-Regular'}}
                    />
                    <BouncyCheckbox
                        text={'lowFodmap'}
                        onPress={() => setFilters(prevState => ({...prevState, lowFodmap: !prevState.lowFodmapFree}))}
                        isChecked={filters.lowFodmap}
                        style={{padding: 10}}
                        textStyle={{textDecorationLine: 'none', color: 'black', fontSize: 18, fontFamily: 'KohinoorTelugu-Regular'}}
                    />
                </View>
            </View>
            <View style={{margin: 10, marginBottom: 15 ,alignItems: "center"}} >
                <Text style={{fontSize: 20, fontFamily: 'KohinoorTelugu-Regular'}}>{selectedCalories}</Text>
                <Slider
                    containerStyle={{width: 310}}
                    onValueChange={handleChangeCalories}
                    value={selectedCalories}
                    step={25}
                    thumbTouchSize={{width: 40, height: 40}}
                    minimumValue={0}
                    maximumValue={1000}
                    minimumTrackTintColor={'orange'}
                    thumbTintColor={'whitesmoke'}
                    thumbStyle={{borderWidth: 2, height: 30, width: 15}}
                />
                <Text style={{fontFamily: 'KohinoorTelugu-Regular'}} >Calories</Text>
            </View>
            <View style={{margin: 10, alignItems: "center"}}>
            <Text style={{fontSize: 20, fontFamily: 'KohinoorTelugu-Regular'}}>{selectedMinutes}</Text>
                <Slider
                    containerStyle={{width: 310}}
                    onValueChange={handleChangeMinutes}
                    value={selectedMinutes}
                    step={5}
                    thumbTouchSize={{width: 40, height: 40}}
                    minimumValue={0}
                    maximumValue={180}
                    minimumTrackTintColor={'orange'}
                    thumbTintColor={'whitesmoke'}
                    thumbStyle={{borderWidth: 2, height: 30, width: 15}}
                />
                <Text style={{fontFamily: 'KohinoorTelugu-Regular'}}>Cooking Time (min)</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        justifyContent: 'center', 
        marginLeft: 20, 
        marginTop: 10
    }, 
    checkboxText: {
        textDecorationLine: "none", 
        color: 'black',
        fontSize: 18
    },
    checkboxContainer: {
        margin: 10, 
        width: 150
    }
    
})

export default FilterModal