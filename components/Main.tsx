import { StyleSheet, Text, View, Animated } from "react-native";
import { useState, useRef } from "react";
import AnimatedButton from "./AnimatedButton";

export function Main() {
    const [clicks, setClicks] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        if (isFading) {
            setIsFading(false);
            fadeAnim.setValue(1); 
        }
        setClicks(clicks + 1);
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleLongPress = () => {
        setClicks(0);
        setIsFading(true); 
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (!isFading) {
                fadeAnim.stopAnimation();
            }
        });
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.counterText, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}>
                { clicks === 0 ? 'No me has tocado aún 😢' : `Me has tocado ${clicks} vez${clicks > 1 ? 'es' : ''} 😈` }
            </Animated.Text>
            <AnimatedButton
                onPress={handlePress} 
                onLongPress={handleLongPress}
                text="Tócame 😈" 
                buttonStyle={styles.customButton} 
                textStyle={styles.customButtonText} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 24, 
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    customButton: {
        backgroundColor: '#9F8BFF',
        padding: 15,
        borderRadius: 10,
    },
    customButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
