import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Easing, Dimensions } from "react-native";

export const LoadingPage = () => {
    const LENGTH = { MAX_LENGTH: 250, MIN_LENGTH: 230 };

    const animated = useRef(
        Array.from({ length: 25 }, () => 0).map(() => new Animated.Value(0))
    ).current;

    const rotate = animated.map((value) =>
        value.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
        })
    );

    const dotColors = ["#c16ea4", "#c1267d", "#d1a0be", "#913887"];

    const makeFirstLoop = () => {
        const loop = animated.map((value) => {
            value.current = new Animated.Value(0);
            const duration = Math.floor(Math.random() * 2500 + 1500);
            return Animated.timing(value, {
                toValue: 1,
                duration,
                useNativeDriver: true,
                easing: Easing.linear,
            });
        });
        return Animated.parallel(loop);
    };

    const makeRestLoop = () => {
        return animated.map((value) => {
            value.current = new Animated.Value(0);
            const duration = Math.floor(Math.random() * 7000 + 6000);
            return Animated.timing(value, {
                toValue: 1,
                duration,
                useNativeDriver: true,
                easing: Easing.linear,
            });
        });
    };

    const repeatLoop = (value) => {
        value.reset();
        value.start(() => repeatLoop(value));
    };

    const turnLoop = () => {
        const firstLoop = makeFirstLoop();
        firstLoop.start();

        setTimeout(() => {
            firstLoop.stop();
            makeRestLoop().map((value) => {
                value.start(() => {
                    repeatLoop(value);
                });
            });
        }, 800);
    };

    const randomlySetDotPosition = (length) => {
        const stride = Math.floor(Math.random() * length);
        const gap = Math.floor((length - LENGTH.MIN_LENGTH) / 2);
        if (stride < gap || stride > gap + length) {
            return { left: stride, top: stride };
        } else {
            const topStride =
                Math.floor(Math.random() * gap) +
                Math.round(Math.random()) * (LENGTH.MIN_LENGTH + gap);
            return { left: stride, top: topStride };
        }
    };

    const renderDots = () => {
        const dots = rotate.map((value, index) => {
            const routeSize = Math.floor(
                Math.random() * LENGTH.MAX_LENGTH + LENGTH.MIN_LENGTH
            );
            const dotSize = Math.random() * 6 + 2;
            const radius = routeSize / 4;
            const color =
                dotColors[Math.floor(Math.random() * dotColors.length)];
            const position = randomlySetDotPosition(routeSize);
            return (
                <Animated.View
                    key={index}
                    style={[
                        styles.route,
                        {
                            width: routeSize,
                            height: routeSize,
                            borderRadius: radius,
                            transform: [{ rotate: value }],
                        },
                    ]}
                >
                    <View
                        style={[
                            {
                                width: dotSize,
                                height: dotSize,
                                left: position.left,
                                top: position.top,
                                borderRadius: dotSize / 2,
                                backgroundColor: color,
                            },
                        ]}
                    />
                </Animated.View>
            );
        });

        return dots;
    };

    useEffect(() => {
        turnLoop();
    }, []);

    return renderDots();
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
    route: {
        position: "absolute",
    },
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
