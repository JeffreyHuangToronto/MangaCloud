/** @format */

import { Button } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MangaDetailsScreen } from "../src/components/Index";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

function MangaDetailsStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Manga Details'
                component={MangaDetailsScreen}
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

export default MangaDetailsStack;
