import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function plan(){
    return(
        <View>
            <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, marginRight: 10, marginLeft: 10, paddingBottom: 10, paddingTop: 15}} >
                <Text style={{fontSize: 22, fontFamily: 'KohinoorTelugu-Regular', marginBottom: 5}}>
                    Plan
                </Text>
            </View>
            <ScrollView style={{marginTop: 15}}>
                <View style={{borderTopWidth: 2, borderBottomWidth: 2, borderColor: 'black', marginTop: 10, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{borderRightWidth: 2, padding: 8, alignSelf: 'flex-start', alignItems: 'center'}} >
                        <Text style={{fontSize: 18}}>JUL</Text>
                        <Text style={{fontSize: 18}}>7</Text>
                        <Text style={{fontSize: 11}}>(F)</Text>
                    </View>
                    <Text style={{fontSize: 25, marginRight: 5}}>+</Text>
                </View>
            </ScrollView>
        </View>
    )
}