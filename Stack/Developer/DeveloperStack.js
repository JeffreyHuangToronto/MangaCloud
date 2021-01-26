/** @format */

/** @format */

import { Button } from "react-native";
import DeveloperSettings from "../../src/components/Main Components/DeveloperSettings";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
function DeveloperStack() {
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName={"Developer Settings"}>
            <Stack.Screen
                name='Developer Settings'
                component={DeveloperSettings}
                options={{
                    headerLeft: () => (
                        <Ionicons.Button
                            name='md-menu'
                            size={32}
                            color='rgba(115, 116, 228, 1)'
                            style={{ padding: 5 }}
                            backgroundColor='rgba(0,0,0,0)'
                            onPress={() => {
                                navigation.dispatch(DrawerActions.openDrawer());
                            }}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default DeveloperStack;
