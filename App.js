import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { LoadingPage } from "./LoadingPage";
import { CenterContentsPage } from "./CenterContentsPage";
import { CardOrigamiPage } from "./CardOrigamiPage";

export const App = () => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={"transparent"}
                translucent={true}
            />
            {/* <LoadingPage /> */}
            {/* <CenterContentsPage /> */}
            <CardOrigamiPage />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
