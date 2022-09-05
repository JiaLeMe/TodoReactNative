import React from 'react';
import { HeaderView, HeaderTitle, HeaderButton, colors } from './../styles/appStyles';
import { FontAwesome5 } from '@expo/vector-icons';


const Header = ({clearTasks}) => {
    return (
        <HeaderView>
            <HeaderTitle>Tasks</HeaderTitle>
            <HeaderButton onPress={clearTasks}>
                <FontAwesome5 name="trash" size={24} color={colors.tertiary} />
            </HeaderButton>
        </HeaderView>
    );
}

export default Header;