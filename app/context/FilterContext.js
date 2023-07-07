import {createContext, useState, useEffect} from 'react';

const FilterContext = createContext()

function FilterContextProvider(props) {
    const [selectedCalories, setSelectedCalories] = useState(0)
    const [selectedMinutes, setSelectedMinutes] = useState(0)
    const [filters, setFilters] = useState({
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
    })
    const [activeFilters, setActiveFilters] = useState([])
    const [activeSliders, setActiveSliders] = useState({caloriesActive: false, minutesActive: false})

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
        <FilterContext.Provider value={{filters, setFilters, activeFilters, setActiveFilters, selectedCalories, setSelectedCalories,  selectedMinutes, setSelectedMinutes, activeSliders, setActiveSliders, handleChangeCalories, handleChangeMinutes}} >
            {props.children}
        </FilterContext.Provider>
    );
}

export {FilterContextProvider, FilterContext};