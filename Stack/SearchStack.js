/** @format */

import {
  MangaDetailsScreen,
  MangaReaderScreen,
  NewMangaReaderScreen,
} from "../src/components/Index";

import { Button } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SearchScreen } from "../src/components/Index";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

function SearchStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        key={"Search"}
        options={{
          headerLeft: () => (
            <Ionicons.Button
              name="md-menu"
              size={32}
              color="rgba(115, 116, 228, 1)"
              style={{ padding: 5 }}
              backgroundColor="rgba(0,0,0,0)"
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="Manga Details" component={MangaDetailsScreen} />
      <Stack.Screen
        name="Manga Reader"
        component={NewMangaReaderScreen}
        options={{ headerShown: false, gestureEnabled: true }}
      />
    </Stack.Navigator>
  );
}

export default SearchStack;
