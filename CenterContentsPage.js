import React, { useRef, useEffect } from "react";
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    Text,
    Image,
} from "react-native";
import Logo from "./image/logo_128.png";

export const CenterContentsPage = () => {
    const logoAnimated = useRef(new Animated.Value(0)).current;
    const logoRotate = logoAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    const logoFlipAni = () => {
        Animated.spring(logoAnimated, {
            toValue: 1,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        logoFlipAni();
    }, []);

    return (
        <View style={styles.textBox}>
            <Animated.View
                style={{
                    transform: [{ rotateY: logoRotate }],
                }}
            >
                <Image style={{ width: 40, height: 48 }} source={Logo} />
            </Animated.View>
            <Text style={styles.text}>예약을 진행 중입니다.</Text>
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
});
