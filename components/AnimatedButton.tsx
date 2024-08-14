import React, { useRef, useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle, TextStyle, Animated } from 'react-native';

interface MainButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedButton: React.FC<MainButtonProps> = ({ onPress, onLongPress, text, buttonStyle, textStyle }) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnimation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();

    pressTimer.current = setTimeout(() => {
      setIsRed(true);
    }, 400);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
    setIsRed(false);
  };

  useEffect(() => {
    return () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    };
  }, []);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.button,
            buttonStyle,
            { transform: [{ scale: scaleAnimation }] },
            isRed ? styles.redButton : null,
            { opacity: pressed ? 0.8 : 1 }
          ]}
        >
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#383C99',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: '#FF4E3E',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default AnimatedButton;