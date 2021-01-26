/** @format */

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { connect } from "react-redux";

const Summary = (props) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <TouchableOpacity
            onPress={() => {
                setShowMore(!showMore);
            }}
            activeOpacity={1}>
            <Text style={styles.summary} numberOfLines={!showMore ? 2 : -1}>
                {props.summary}
            </Text>
        </TouchableOpacity>
    );
};

export default Summary;

const styles = StyleSheet.create({
    summary: {
        padding: 10,
        fontSize: 18,
        color: "white",
    },
});
