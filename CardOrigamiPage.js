import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions, Text } from "react-native";

export const CardOrigamiPage = () => {
    const cardAnimated = useRef(new Animated.Value(0)).current;
    const colorAnimated = useRef(new Animated.Value(0)).current;
    const revealColorAnimated = useRef(new Animated.Value(0)).current;

    const cardRotate = cardAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-180deg"],
    });
    const colorRotate = colorAnimated.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });
    const revealColorRotate = revealColorAnimated.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    const cardFlipAni = () => {
        Animated.loop(
            Animated.parallel([
                Animated.spring(cardAnimated, {
                    toValue: 1,
                    friction: 4,
                    tension: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(revealColorAnimated, {
                    toValue: 150,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
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
                    style={[
                        styles.foldedCardPart,
                        {
                            transform: [
                                { rotateX: cardRotate },
                                { rotateY: cardRotate },
                            ],
                            borderColor: "#d42361",
                        },
                    ]}
                ></Animated.View>
                <Animated.View
                    style={[
                        styles.foldedCardPart2,
                        {
                            opacity: revealColorRotate,
                            borderColor: "#d42361",
                        },
                    ]}
                ></Animated.View>
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
        borderLeftWidth: 2,
        borderTopWidth: 2,
    },
    foldedCardPart2: {
        width: width * 0.1,
        height: width * 0.1,
        borderTopWidth: 2,
        right: width * 0.1,
    },
});
