import React, { useRef, useEffect } from "react";
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    Text,
    Image,
} from "react-native";

export const CardOrigamiPage = () => {
    const cardAnimated = useRef(new Animated.Value(0)).current;
    const cardRotate = cardAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-180deg"],
    });

    const cardFlipAni = () => {
        Animated.spring(cardAnimated, {
            toValue: 1,
            friction: 4,
            tension: 4,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        cardFlipAni();
    }, []);

    return (
        <View style={styles.textBox}>
            <View style={styles.card}>
                <View style={styles.unFoldedCardPart}>
                    <View style={styles.pointInCard} />
                </View>
                <Animated.View
                    style={{
                        transform: [
                            { rotateX: cardRotate },
                            { rotateY: cardRotate },
                        ],
                    }}
                >
                    <View style={styles.foldedCardPart}></View>
                </Animated.View>
            </View>
            <Text style={styles.text}>결제 정보 확인 중</Text>
        </View>
    );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
    textBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: width * 0.5,
        height: width * 0.25,
        position: "absolute",
    },
    text: {
        fontFamily: "AirbnbCereal",
        color: "black",
        fontSize: width * 0.05,
    },
    card: {
        flexDirection: "row",
    },
    unFoldedCardPart: {
        width: width * 0.04,
        height: width * 0.1,
        borderColor: "#d42361",
        borderWidth: 2,
        borderRightWidth: 0,
    },
    pointInCard: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: "#d42361",
        margin: 4,
    },
    foldedCardPart: {
        width: width * 0.1,
        height: width * 0.1,
        borderLeftColor: "#000",
        borderTopColor: "#000",
        borderLeftWidth: 2,
        borderTopWidth: 2,
    },
});
