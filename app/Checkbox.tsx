import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';


function Checkbox({changeChecked, filter}) {
    const {checked, label, id} = filter
    return (
        <BouncyCheckbox
            isChecked={checked}
            onPress={() => changeChecked(id)}
            text={label}
            textStyle={{textDecorationLine: 'none', color: 'black', fontSize: 18, fontFamily: 'KohinoorTelugu-Regular'}}
            size={30}
            style={{padding: 10}}
        />
    );
}

export default Checkbox;