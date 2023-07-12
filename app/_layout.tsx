import { Stack } from 'expo-router';
import {Pressable, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { DataContextProvider } from './context/DataContext';
import { RecipeContextProvider } from './context/RecipeContext';
import { FilterContextProvider } from './context/FilterContext';

export default function StackLayout(){

    const router = useRouter()

    function closeModal(){
        router.back()
    }

    function openFilter(){
        router.push('FilterModal')
    }


    return(
        <FilterContextProvider>
        <RecipeContextProvider>
        <DataContextProvider>
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#FF862A',
            },
            headerTitleStyle: {
                color: 'whitesmoke',
                fontSize: 30, 
                fontFamily: 'ChalkboardSE-Bold',
            },
            headerTitle: 'BUONO',
        }} >
            <Stack.Screen  
                options={{
                    title: 'Search',
                    headerLeft: () => (
                        <Pressable onPress={openFilter} >
                            <Image source={require('/Users/franklingallardo/Food_RN/food-rn/assets/icons/filter.png')} style={{height: 28, width: 28}} />
                        </Pressable>
                    )
                }} 
                name='(tabs)' />
            <Stack.Screen  
                options={{ 
                    headerTitle: 'filters', 
                    headerBackVisible: false,
                    presentation: 'containedModal',

                    headerRight: () => (
                        <Pressable onPress={closeModal} style={{padding: 10}} >
                            <Text style={{color: 'whitesmoke', fontSize: 20, fontWeight: 'bold'}}>X</Text>
                        </Pressable>
                        
                    )
                }}
                name='FilterModal' />
                <Stack.Screen  
                options={{ 
                    headerTitle: 'details', 
                    headerBackVisible: false,
                    presentation: 'modal',
                    
                    headerRight: () => (
                        <Pressable onPress={closeModal} style={{padding: 10}} >
                            <Text style={{color: 'whitesmoke', fontSize: 20, fontWeight: 'bold'}}>X</Text>
                        </Pressable>
                        
                    )
                }}
                name='[id]' />
        </Stack>
        </DataContextProvider>
        </RecipeContextProvider>
        </FilterContextProvider>
    )
}