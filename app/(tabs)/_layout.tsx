import { Tabs } from "expo-router"
import React from "react"
import { Image } from "react-native"

export default function (){
    return(
        <Tabs>
            <Tabs.Screen name="saved" options={{ 
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FF862A'
                },
                tabBarLabelStyle: {
                    color: 'whitesmoke',
                    fontWeight: "bold", 
                    fontSize: 12
                },
                tabBarIcon: ({focused}) => {
                    return(
                        focused === true ? <Image style={{height: 20, width: 20}} source={require("food-rn/assets/icons/icons8-check-24.png")}/>
                        : <Image style={{height: 13, width: 13}} source={require("food-rn/assets/icons/icons8-checked-25.png")}/>
                    )
                }
            }} 
            />
            <Tabs.Screen name="search" options={{
                headerShown: false, 
                tabBarStyle: {
                    backgroundColor: '#FF862A'
                },
                tabBarLabelStyle: {
                    color: 'whitesmoke',
                    fontWeight: "bold",
                    fontSize: 12
                },
                tabBarIcon: ({focused}) => {
                    return(
                        focused === true ? <Image style={{height: 20, width: 20}} source={require("food-rn/assets/icons/search-filled.png")}/>
                        : <Image style={{height: 17, width: 17}} source={require("food-rn/assets/icons/search.png")}/>
                    )
                },
            }} 
            />
            <Tabs.Screen name="plan" options={{ 
                headerShown: false, 
                tabBarStyle: {
                    backgroundColor: '#FF862A',
                },
                tabBarLabelStyle: {
                    color: 'whitesmoke',
                    fontWeight: "bold",
                    fontSize: 12
                }, 
                tabBarIcon: ({focused}) => {
                    return(
                        focused === true ? <Image style={{height: 22, width: 22}} source={require("food-rn/assets/icons/calendar-filled.png")}/>
                        : <Image style={{height: 18, width: 18}} source={require("food-rn/assets/icons/calendar.png")}/>
                    )
                },
            }}  />
        </Tabs>
    )
}