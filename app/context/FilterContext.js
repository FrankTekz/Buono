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
    
    
    

    return (
        <FilterContext.Provider value={{filters, setFilters, activeFilters, setActiveFilters, selectedCalories, setSelectedCalories,  selectedMinutes, setSelectedMinutes, activeSliders, setActiveSliders}} >
            {props.children}
        </FilterContext.Provider>
    );
}

export {FilterContextProvider, FilterContext};