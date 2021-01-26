/** @format */

import { Alert, Button, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const DeveloperSettings = () => {
    return (
        <View>
            <Button
                title={"Clear Storage"}
                onPress={() => {
                    Alert.alert("Storage", "Are you sure you want to clear all saved history and current favorites?", [
                        { text: "CANCEL", onPress: () => {}, style: "cancel" },
                        { text: "CLEAR", onPress: () => AsyncStorage.removeItem("@historyState") },
                    ]);
                }}
            />
            <Button
                title={"Clear History State"}
                onPress={() => {
                    Alert.alert("History", "Are you sure you want to clear all manga reading history?", [
                        { text: "CANCEL", onPress: () => {}, style: "cancel" },
                        { text: "CLEAR", onPress: () => AsyncStorage.removeItem("@historyState") },
                    ]);
                }}
            />
            <Button
                title={"Clear Favorate State"}
                onPress={() => {
                    Alert.alert("History", "Are you sure you want to clear all manga favorites?", [
                        { text: "CANCEL", onPress: () => {}, style: "cancel" },
                        { text: "CLEAR", onPress: () => AsyncStorage.removeItem("@favoriteState") },
                    ]);
                }}
            />
        </View>
    );
};

export default DeveloperSettings;
