/** @format */

import { Button, SafeAreaView } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";

import CompletedStack from "./Stack/CompletedStack";
import { DarkTheme } from "@react-navigation/native";
import DeveloperStack from "./Stack/Developer/DeveloperStack";
import { DrawerActions } from "@react-navigation/native";
import FavoriteStack from "./Stack/FavoriteStack";
import { Ionicons } from "@expo/vector-icons";
// import MangaDetailsStack from "./Stack/MangaDetailsStack";
import React from "react";
import SearchStack from "./Stack/SearchStack";
import { connect } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();

function App() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Drawer.Navigator initialRouteName='Favorites'>
                <Drawer.Screen name='Favorites' component={FavoriteStack} options={{ swipeEnabled: false }} />
                <Drawer.Screen name='Completed' component={CompletedStack} options={{ swipeEnabled: false, headerShown: false }} />
                <Drawer.Screen name='Search' component={SearchStack} options={{ swipeEnabled: false }} />
                <Drawer.Screen name='Developer' component={DeveloperStack} options={{ swipeEnabled: false }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default App;
